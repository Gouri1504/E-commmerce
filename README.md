# Simplified Product Display Web Application

## 🎯 Objective

This project is a responsive web application designed to showcase products such as shoes or apparel. The primary focus is on frontend development, UI design, and user interaction. Backend integration and barcode scanning have been implemented as optional enhancements.

## ⚙️ Tech Stack

### Frontend

*   **React.js:** A JavaScript library for building user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Context API:** For efficient and centralized state management.

### Backend & Data

*   **FakeStoreAPI:** Integrated with a public API to fetch product data dynamically for demonstration purposes.
*   **Node.js (Optional):**  A JavaScript runtime for building scalable backend servers.
*   **REST APIs (Optional):**  Implemented for CRUD operations on product data and cart management.
*   **MongoDB (Optional):**  A NoSQL database used for persistent storage of product and cart data.

### Web-Based Barcode Scanner (Optional)

*   **QuaggaJS:**  A JavaScript library used for barcode scanning functionality.

## ✨ Features

1.  **Product List Page**

    *   Displays a list of products with images, names, brands, and prices.
    *   Fully responsive design optimized for desktop and mobile devices.
    *   Includes an "Add to Bag" button for each product.

2.  **Product Detail View**

    *   Clicking on a product opens a modal/page with detailed information.
    *   Displays the product description, price, and mock reviews.
    *   Provides "Add to Bag" functionality directly from the detail view.

3.  **"My Bag" (Shopping Cart) Feature**

    *   A shopping cart accessible via a navigation bar or button.
    *   Clicking "My Bag" opens a side-drawer/modal displaying:
        *   Products added to the bag.
        *   Their quantities.
        *   Individual and total prices.
        *   Options to remove items or adjust quantities.

4.  **State Management**

    *   Utilizes React Context API for efficient state handling across the application.
    *   Manages product data, cart state, and user interactions seamlessly.

## 🚀 Additional Features Implemented

*   **Backend Integration (Optional):** Fetches product data dynamically from FakeStoreAPI or a custom backend.
*   **Barcode Scanner (Optional):**  Integrated barcode scanning for quick product lookup using QuaggaJS.

## 📖 Installation & Setup

### Prerequisites

*   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)) installed on your system.
*   [MongoDB](https://www.mongodb.com/) instance running (if using the backend).

### Steps to Set Up

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd product-display-app
    ```

3.  **Install frontend dependencies:**

    ```bash
    npm install   # or yarn install
    ```

4.  **(Optional) Install backend dependencies (if applicable):**

    ```bash
    cd backend
    npm install   # or yarn install
    ```

5.  **(Optional) Start the backend server (if applicable):**

    ```bash
    npm start     # or yarn start
    ```

6.  **Start the frontend application:**

    ```bash
    cd ../frontend
    npm start     # or yarn start
    ```

7.  **Open the app in your browser:**

    ```
    http://localhost:3000
    ```

## 🎨 Design Choices

*   A modern UI with an emphasis on simplicity and responsiveness.
*   Usage of Tailwind CSS for fast, clean, and consistent styling.
*   Intuitive navigation and user-friendly interactions.

## 🛠️ Challenges Faced & Solutions

*   **Ensuring a responsive layout:**  Utilized CSS Grid/Flexbox and media queries for optimal viewing across different devices.
*   **State management:**  Adopted React Context API for global state handling and improved component reusability.
*   **Backend integration:** Used Axios to fetch and manage API data efficiently.
*   **Barcode scanner implementation:** Configured QuaggaJS to accurately scan barcodes in various lighting conditions and environments.