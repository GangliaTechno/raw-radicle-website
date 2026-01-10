// Fix Wayback Machine URLs Script
// This script fixes form actions and handles cart operations for the static site

(function () {
  // Function to fix Wayback Machine URLs
  function fixWaybackUrl(url) {
    if (!url || typeof url !== "string") return url;

    // Check if it's a Wayback URL
    if (url.includes("web.archive.org") || url.includes("/web/20")) {
      let newUrl = url;

      // Pattern: /web/20230605094357/https://mvstselect.com/cart/add
      // Pattern: /web/20230603175629/https://mvstselect.com/cart/add
      // Pattern: /web/20230603165520/https://mvstselect.com/cart/add

      // Try multiple patterns to extract the path
      // Pattern 1: /web/TIMESTAMP/https://domain.com/path
      let match = url.match(/\/web\/\d+\/https?:\/\/[^\/]+(\/.+)/);
      if (match && match[1]) {
        newUrl = match[1]; // Extract just the path like /cart/add
      } else {
        // Pattern 2: /web/TIMESTAMP/https://domain.com/path (with query string)
        match = url.match(/\/web\/\d+\/https?:\/\/[^\/]+(\/[^?#]+)/);
        if (match && match[1]) {
          newUrl = match[1];
        } else {
          // Pattern 3: Remove Wayback prefix more aggressively
          newUrl = url.replace(/^\/web\/\d+\/https?:\/\/[^\/]+/, "");
          // If still starts with /web/, try another pattern
          if (newUrl.startsWith("/web/")) {
            newUrl = url
              .replace(/^\/web\/\d+\//, "")
              .replace(/^https?:\/\/[^\/]+/, "");
          }
        }
      }

      // Clean up: remove query strings and fragments if we want just the path
      // But keep them if they exist in the original
      const queryMatch = url.match(/(\?[^#]*)?(#.*)?$/);
      if (queryMatch && queryMatch[0] && !newUrl.includes("?")) {
        // Don't add query if it's part of Wayback URL structure
      }

      // Ensure it starts with /
      if (!newUrl.startsWith("/")) {
        newUrl = "/" + newUrl;
      }

      console.log("Fixed Wayback URL:", url, "->", newUrl);
      return newUrl;
    }

    return url;
  }

  // Fix all form action URLs that point to Wayback Machine
  function fixFormActions() {
    const forms = document.querySelectorAll("form[action]");
    forms.forEach((form) => {
      const action = form.getAttribute("action");
      if (
        action &&
        (action.includes("web.archive.org") || action.includes("/web/20"))
      ) {
        const newAction = fixWaybackUrl(action);
        form.setAttribute("action", newAction);
      }
    });
  }

  // Intercept form submissions to fix URLs before they're submitted
  function interceptFormSubmissions() {
    document.addEventListener(
      "submit",
      function (event) {
        const form = event.target;
        if (form.tagName === "FORM") {
          const action = form.getAttribute("action");
          if (
            action &&
            (action.includes("web.archive.org") || action.includes("/web/20"))
          ) {
            event.preventDefault();
            event.stopPropagation();

            // Fix the action URL
            const newAction = fixWaybackUrl(action);

            // Update form action
            form.setAttribute("action", newAction);

            // For cart operations, handle them via fetch (since this is a static site)
            if (newAction.includes("/cart/")) {
              const formData = new FormData(form);
              const method = form.method || "POST";

              fetch(newAction, {
                method: method,
                body: formData,
              })
                .then((response) => {
                  if (response.ok) {
                    console.log("Cart operation successful");
                    // Trigger a custom event that the cart UI can listen to
                    window.dispatchEvent(new CustomEvent("cartUpdated"));
                    // If it's add to cart, show a success message
                    if (newAction.includes("/cart/add")) {
                      // You can add a toast notification here
                      console.log("Item added to cart");
                    }
                  }
                  return response.json().catch(() => response.text());
                })
                .then((data) => {
                  console.log("Cart response:", data);
                })
                .catch((error) => {
                  console.error("Cart operation error:", error);
                });
            } else {
              // For other forms, submit normally with fixed URL
              form.submit();
            }
          }
        }
      },
      true
    ); // Use capture phase to catch early
  }

  // Intercept fetch requests to fix Wayback URLs
  function interceptFetch() {
    if (typeof window.fetch === "undefined") return;

    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      let url = args[0];

      // If URL is a string and contains Wayback pattern, fix it
      if (typeof url === "string") {
        if (url.includes("web.archive.org") || url.includes("/web/20")) {
          url = fixWaybackUrl(url);
          args[0] = url;
        }
      }

      // If URL is a Request object, we need to handle it differently
      if (url && typeof url === "object" && url.constructor === Request) {
        const requestUrl = url.url;
        if (
          requestUrl &&
          (requestUrl.includes("web.archive.org") ||
            requestUrl.includes("/web/20"))
        ) {
          const newUrl = fixWaybackUrl(requestUrl);
          // Create new Request with fixed URL
          const newRequest = new Request(newUrl, {
            method: url.method,
            headers: url.headers,
            body: url.body,
            mode: url.mode,
            credentials: url.credentials,
            cache: url.cache,
            redirect: url.redirect,
            referrer: url.referrer,
            integrity: url.integrity,
          });
          args[0] = newRequest;
        }
      }

      return originalFetch.apply(this, args);
    };
  }

  // Intercept XMLHttpRequest to fix Wayback URLs
  function interceptXHR() {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      if (
        typeof url === "string" &&
        (url.includes("web.archive.org") || url.includes("/web/20"))
      ) {
        url = fixWaybackUrl(url);
      }
      return originalOpen.apply(this, [method, url, ...rest]);
    };
  }

  // Run fixes immediately (before DOM is ready for fetch/XHR interception)
  interceptFetch();
  interceptXHR();

  // Run DOM fixes when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      fixFormActions();
      interceptFormSubmissions();
    });
  } else {
    fixFormActions();
    interceptFormSubmissions();
  }

  // Also fix dynamically added forms
  const observer = new MutationObserver(function (mutations) {
    fixFormActions();
  });
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    // Wait for body to be available
    document.addEventListener("DOMContentLoaded", function () {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
