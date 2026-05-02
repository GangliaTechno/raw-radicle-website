# Raw Radicles: Premium Wellness Ecommerce Platform

## Flow & Technical Analysis

### Overview
**Raw Radicles** is a high-end e-commerce platform specializing in premium Ayurvedic-infused wellness products. The platform features a custom-built content management system (CMS) using a flat-file JSON database, an automated moderation system for user reviews, and a professional administrative dashboard for real-time store management.

### Tech Stack

| Layers | Technology |
| :--- | :--- |
| **Frontend (Public)** | HTML5, Vanilla CSS, JavaScript, WebComponents |
| **Frontend (Admin)** | HTML5, CSS (Montserrat UI), JavaScript (Vanilla) |
| **Backend** | Node.js, Express 5.x |
| **Database** | JSON Flat-file Database (Performance Optimized) |
| **Utilities** | Axios, Dotenv, Ruffle (Flash Emulation) |

---

### Main Point of the Project
The project provides a high-speed, localized shopping experience that bridges traditional wellness solutions with modern digital retail. It eliminates the need for complex RDBMS by utilizing an optimized JSON storage layer, ensuring rapid deployment and low-latency content delivery.

---

### Stages & Technical Flow

#### Stage 1: Product Management & Display
Serving a dynamic catalog of products to visitors using asynchronous data fetching.

**Flowchart Steps:**
1. **Initial Load**: User visits the site; the server delivers `index.html` and static assets.
2. **API Request**: The client-side script `cms-loader.js` triggers a `GET` request to `/api/products`.
3. **Data Retrieval**: `server.js` reads the current state of `products.json` from the filesystem.
4. **Dynamic Rendering**: JavaScript parses the JSON response and dynamically generates HTML product cards.
5. **DOM Injection**: The generated cards are injected into the product grid container for immediate display.

**Files Involved:**
*   [server.js](file:///d:/project2/server.js) (API Endpoints & Routing)
*   [products.json](file:///d:/project2/products.json) (Core Product Inventory)
*   `public/js/cms-loader.js` (Frontend rendering logic)

---

#### Stage 2: Automated Review Moderation
A sophisticated system to ensure quality and authenticity in user-generated content.

**Flowchart Steps:**
1. **Submission**: A user submits a review via the product interface.
2. **Scoring**: `server.js` executes `calculateReviewScore()` to analyze the content.
3. **Validation Rules**:
    - **Spam Detection**: Scans for repeated words and external links.
    - **Toxicity Filter**: Flags words defined in the `TOXIC_WORDS` blacklist.
    - **Verified Weighting**: Adds points for verified purchase status and review length.
4. **Auto-Action**:
    - **Score >= 1**: Review is published immediately to `products_cms.json`.
    - **Score < 1**: Review is moved to `pending_reviews.json` for manual oversight.

**Files Involved:**
*   [server.js](file:///d:/project2/server.js) (Moderation logic & Scoring)
*   [pending_reviews.json](file:///d:/project2/pending_reviews.json) (Moderation queue)
*   `public/js/reviews.js` (Submission UI handling)

---

#### Stage 3: Administrative Control (CMS)
A centralized dashboard for real-time store updates and moderation.

**Flowchart Steps:**
1. **Authentication**: Admin logs in via the secure portal.
2. **State Sync**: `admin.html` fetches the latest data from products, reviews, and homepage JSON files.
3. **Modification**: Admin updates content, uploads new product images, or approves pending reviews.
4. **Syncing**: UI sends `POST` or `DELETE` requests to the backend with updated data payloads.
5. **Persistence**: Server overwrites the corresponding JSON files on disk to finalize changes.

**Files Involved:**
*   [public/admin.html](file:///d:/project2/public/admin.html) (Main Dashboard Interface)
*   `public/js/cms-sync.js` (Sync and State management)
*   `public/assets/uploads/` (Storage for user-uploaded product media)

---

### Current Implementation Status

| Features | Status |
| :--- | :--- |
| **Dynamic Product Catalog** | ✅ Completed |
| **Automated Review Moderation** | ✅ Completed |
| **Admin CMS Dashboard** | ✅ Completed |
| **Image Upload System** | ✅ Completed |
| **Instagram Feed (Simulated)** | ✅ Completed |
| **Responsive UI Design** | ✅ Completed |
| **Legacy Media Support (Flash)** | ✅ Completed |

---

## Admin Access & CMS Management

The Raw Radicles platform includes a powerful administrative suite for real-time site management. Below are the detailed steps for accessing and utilizing the CMS.

### 1. Navigation & Authentication
To access the administrative tools, follow these steps:

1.  **Navigate to the Login Page**: Go to `/login.html` in your browser. Alternatively, visiting `/admin.html` directly will redirect you to the login page if you are not authenticated.
2.  **Enter Admin Credentials**: Use one of the authorized administrative accounts:
    *   **Usernames (Emails)**: 
        *   `admin@rawradicles.com`
        *   `dsplmanipal@gmail.com`
        *   `director@dashapatmaja.in`
        *   `info@rawradicles.com`
    *   **Default Password**: `admin123`
3.  **Access the Dashboard**: Upon successful login, you will be automatically redirected to the **Admin Dashboard** (`admin.html`), where you can see site-wide statistics and recent activity.

### 2. Managing Products
The CMS provides two levels of product management:

#### A. Global Product Catalog (Quick Edits)
Used for updating core product information that appears in the shop grid.
1.  Select **Products** from the sidebar navigation.
2.  Find the product card you wish to modify.
3.  Click the **Edit Details** button on the card.
4.  In the modal that appears, you can update:
    *   **Product Name & Description**
    *   **Pricing**: Update both selling price and MRP (for discount display).
    *   **Product Media**: Upload or change the primary and hover images.
5.  Click **Save Changes** to apply updates instantly to the live site.
Note: This updation is only for sliders and Products page. If you want modify individual product details then go to Product CMS.

#### B. Granular Product Content (Product CMS)
Used for managing the deep content found on individual product pages.
1.  Select **Product CMS** from the sidebar navigation.
2.  Use the **dropdown selector** at the top to choose the specific product you want to manage.
3.  **Content Sections**:
    *   **Gallery**: Manage the 4-image carousel for the product page.
    *   **Basic Info & Badges**: Edit the detailed marketing text and trust badges.
    *   **Features & Specs**: Add or edit collapsible sections for ingredients, certifications, and usage.
    *   **Related Products**: Configure which products are suggested as "Frequently Bought Together."
4.  **Review Moderation**: Approve or delete pending user reviews directly from this interface.
5.  **Save**: Ensure you click the **Save All Changes** button at the top of the editor to persist your updates to `products_cms.json`.

### 3. Home Page & Site Content
To update global site banners, videos, or the FAQ section:
1.  Navigate to the **Home Page** tab in the sidebar.
2.  Modify Hero Banners, Testimonial Videos, or Expert profiles as needed.
3.  Click **Save Home Changes** to update the `homepage.json` file.
