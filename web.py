import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

# --- CONFIGURATION ---
# We use this exact string to lock the scraper into THIS snapshot only
SNAPSHOT_ID = "20230605094357"
BASE_ARCHIVE_URL = f"https://web.archive.org/web/{SNAPSHOT_ID}/https://mvstselect.com/"
ORIGINAL_DOMAIN = "mvstselect.com"
OUTPUT_DIR = "dist"

# Asset Folders
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")
CSS_DIR = os.path.join(OUTPUT_DIR, "css")
JS_DIR = os.path.join(OUTPUT_DIR, "js")
PAGES_DIR = os.path.join(OUTPUT_DIR, "pages")

for d in [OUTPUT_DIR, ASSETS_DIR, CSS_DIR, JS_DIR, PAGES_DIR]:
    os.makedirs(d, exist_ok=True)

session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

visited_pages = set()
asset_map = {}

def download_asset(url, folder, ext_prefix="file"):
    if not url or url.startswith('data:') or 'analytics' in url: return None
    if url.startswith('//'): url = 'https:' + url
    if not url.startswith('http'): url = urljoin(BASE_ARCHIVE_URL, url)
    
    if url in asset_map: return asset_map[url]

    try:
        path_part = urlparse(url).path
        filename = os.path.basename(path_part)
        if not filename or len(filename) > 50: 
            filename = f"{ext_prefix}_{len(asset_map)}.ext"
        
        filename = filename.split('?')[0]
        local_path = os.path.join(folder, filename)

        if not os.path.exists(local_path):
            print(f"   [DL Asset] {filename}")
            r = session.get(url, timeout=10)
            if r.status_code == 200:
                with open(local_path, 'wb') as f:
                    f.write(r.content)
            else:
                return None
        
        rel_folder = os.path.basename(folder)
        asset_map[url] = f"{rel_folder}/{filename}"
        return asset_map[url]
    except:
        return None

def process_page(url, is_home=False):
    if url in visited_pages: return
    visited_pages.add(url)
    print(f"\n>>> Processing Page: {url}")

    try:
        r = session.get(url, timeout=15)
        soup = BeautifulSoup(r.content, "html.parser")
        
        # 1. Assets
        for link in soup.find_all("link", rel="stylesheet"):
            local = download_asset(link.get("href"), CSS_DIR, "style")
            if local: link["href"] = local if is_home else f"../{local}"

        for script in soup.find_all("script", src=True):
            local = download_asset(script.get("src"), JS_DIR, "script")
            if local: script["src"] = local if is_home else f"../{local}"

        for img in soup.find_all("img"):
            src = img.get("data-src") or img.get("src")
            local = download_asset(src, ASSETS_DIR, "img")
            if local:
                img["src"] = local if is_home else f"../{local}"
                if img.has_attr("data-src"): del img["data-src"]

        # 2. STRICT LINK FILTERING
        for a in soup.find_all("a", href=True):
            original_href = a["href"]
            full_url = urljoin(url, original_href)

            # RULE: Only follow links that stay within the 2023 snapshot and the domain
            if SNAPSHOT_ID in full_url and ORIGINAL_DOMAIN in full_url:
                # Clean name for local file
                page_name = full_url.rstrip('/').split('/')[-1]
                if page_name == SNAPSHOT_ID or not page_name or ORIGINAL_DOMAIN in page_name:
                    page_name = "index"
                
                local_html_link = f"pages/{page_name}.html" if is_home else f"{page_name}.html"
                a["href"] = local_html_link

                if full_url not in visited_pages:
                    process_page(full_url, is_home=False)
            else:
                # If it's an external link, leave it or make it absolute
                pass

        # 3. Cleanup Wayback UI
        for tag in soup.find_all(id=lambda x: x and 'wm-ipp' in x): tag.decompose()
        for script in soup.find_all("script"):
            if "archive.org" in str(script): script.decompose()

        # Save
        save_path = os.path.join(OUTPUT_DIR, "index.html") if is_home else \
                    os.path.join(PAGES_DIR, url.rstrip('/').split('/')[-1] + ".html")
        
        with open(save_path, "w", encoding="utf-8") as f:
            f.write(soup.prettify())

    except Exception as e:
        print(f"Error: {e}")

print("Starting STRICT Clone (2023 Snapshot Only)...")
process_page(BASE_ARCHIVE_URL, is_home=True)