# Wellness Product Ecommerce Website

Welcome to the **Wellness Product Ecommerce Website** repository. This project is a high-end e-commerce platform designed for premium health and wellness supplements.

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Data Management](#data-management)
- [Getting Started](#getting-started)
- [Project Report (Mid-Semester Viva)](#project-report)

---

## Project Overview
This platform focuses on providing a professional and localized shopping experience for premium health products. It features a modern design with high-performance UI components and a secure administrative backend.

## Project Structure
```text
d:/project2/
├── frontend/             # Modern React + Vite administrative dashboard
│   └── src/              # React components and data management logic
├── public/               # Main visitor-facing static assets and pages
│   ├── assets/           # Media files and design iconography
│   ├── css/              # Professional stylesheets (Grid, Flexbox, UI effects)
│   ├── js/               # Frontend logic (Search, Auth, Transitions)
│   └── pages/            # Standardized product display pages
├── server.js             # Express 5.x backend server architecture
├── package.json          # Dependency management and scripts
├── products.json         # Data storage for product inventory
└── Project_Report.md     # Mid-Semester Viva report and documentation
```

## Core Components
- **Backend Architecture**: A Node.js and Express server providing secure API endpoints for product and session data management.
- **Frontend (Legacy/Main)**: Responsive, pixel-perfect HTML/CSS layouts that focus on site speed and accessibility.
- **Frontend (Modern)**: A Vite-powered React application designed to handle complex administrative tasks and dynamic content synchronization.

## Data Management
The project utilizes a performance-optimized JSON file system for data persistence, allowing for rapid deployment and simple migration:
- `products.json`: Centralized store for all product categories.
- `homepage.json`: Configuration data for dynamic homepage content.
- `pending_reviews.json`: Moderation queue data for user-generated content.

## Getting Started
To run the project in a local development environment:
1. Ensure Node.js (Latest LTS) is installed.
2. Execute `npm install` in the root directory to set up dependencies.
3. run `npm start` to initialize the Express server.
4. Access the application via `http://localhost:3000`.

## Project Report
For a comprehensive architectural breakdown and a log of technical milestones, please refer to the **[Project_Report.md](file:///d:/project2/Project_Report.md)**, prepared for the Mid-Semester Viva.
