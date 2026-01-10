import os
import re
from bs4 import BeautifulSoup

DIST_DIR = "dist"
PAGES_DIR = os.path.join(DIST_DIR, "pages")

def repair_file(file_path, is_subpage=False):
    print(f"Repairing: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # 1. FIX NAVIGATION LINKS (<a> tags)
    for a in soup.find_all("a", href=True):
        href = a['href']
        
        # If it's a Wayback link or an absolute site link
        if "web.archive.org" in href or "mvstselect.com" in href:
            # Get the page name (e.g., 'suitcases')
            page_name = href.rstrip('/').split('/')[-1]
            
            # Link to Home
            if not page_name or page_name == "mvstselect.com" or page_name.isdigit():
                a['href'] = "../index.html" if is_subpage else "index.html"
            # Link to other sub-pages
            else:
                target = f"{page_name}.html"
                a['href'] = target if is_subpage else f"pages/{target}"

    # 2. FIX ASSET PATHS (Only for sub-pages)
    if is_subpage:
        # Fix Images
        for img in soup.find_all("img", src=True):
            if not img['src'].startswith('http') and not img['src'].startswith('..'):
                img['src'] = f"../{img['src']}"
        
        # Fix CSS
        for link in soup.find_all("link", rel="stylesheet", href=True):
            if not link['href'].startswith('http') and not link['href'].startswith('..'):
                link['href'] = f"../{link['href']}"
        
        # Fix JS
        for script in soup.find_all("script", src=True):
            if not script['src'].startswith('http') and not script['src'].startswith('..'):
                script['src'] = f"../{script['src']}"

    # 3. Save the cleaned file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(soup.prettify())

# Run on index.html
repair_file(os.path.join(DIST_DIR, "index.html"), is_subpage=False)

# Run on everything in pages/
if os.path.exists(PAGES_DIR):
    for filename in os.listdir(PAGES_DIR):
        if filename.endswith(".html"):
            repair_file(os.path.join(PAGES_DIR, filename), is_subpage=True)

print("\nRepair Complete! Navigation and Assets should now work on all pages.")