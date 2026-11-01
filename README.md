# E-Commerce Platform — React Frontend

A responsive e-commerce frontend application built with **React and JavaScript**, featuring product browsing, search, category filtering, product details, and shopping cart management.

The application integrates the [DummyJSON Products API](https://dummyjson.com/docs/products) to retrieve product data and uses **Redux Toolkit** for centralized shopping cart state management.

This project demonstrates frontend development concepts including component-based architecture, API integration, client-side routing, and global state management.

## Features

- **Product Catalogue:** Browse products retrieved from the DummyJSON API.
- **Product Search:** Search for products in the catalogue.
- **Category Filtering:** Filter products by category.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add products to the shopping cart.
- **Quantity Management:** Increase or decrease product quantities.
- **Remove Products:** Remove items from the shopping cart.
- **Cart Calculations:** Calculate item quantities and cart subtotal.
- **Global State Management:** Manage shared cart state using Redux Toolkit.
- **Client-Side Navigation:** Navigate between application pages using React Router.
- **Responsive UI:** User interface designed for different screen sizes.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| JavaScript | Application logic |
| React Router | Client-side routing and navigation |
| Redux Toolkit | Centralized state management |
| Fetch API | Fetching product data |
| DummyJSON API | Sample product data |
| CSS | User interface styling (verify the styling technology used) |
| npm | Package and dependency management |
| Git & GitHub | Version control and source-code hosting |

## Application Architecture

The application follows a component-based frontend architecture. Product data is fetched from an external API, displayed through React components, and managed through application state.

### Application Flow

```text
       DummyJSON Products API
                  |
                  v
              Fetch API
                  |
                  v
          React Components
                  |
          +-------+-------+
          |               |
          v               v
      Product List    Product Search
          |
          v
     Category Filter
          |
          v
    Product Details
          |
          v
     Redux Toolkit
      (Cart Store)
          |
          v
      Shopping Cart
          |
          v
   Quantity / Remove /
     Cart Subtotal
```

## State Management with Redux Toolkit

Redux Toolkit is used to manage the application's shopping cart state centrally.

The cart supports the following operations:

- Add products to the cart.
- Update product quantities.
- Remove products from the cart.
- Calculate the total number of cart items.
- Calculate the cart subtotal.

Centralized state management helps maintain consistent cart information across different components and avoids unnecessary duplication of state.

## External API Integration

The application retrieves product information from the DummyJSON Products API.

**API Documentation:** [DummyJSON Products API](https://dummyjson.com/docs/products)

Example API endpoint:

```http
GET https://dummyjson.com/products
```

The frontend consumes the API response and renders the available product information through React components.

**Note:** DummyJSON is used as an external sample-data provider. This project does not implement its own backend API or database.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/student-mahesh/e-commerce-platform.git
```

Navigate into the project directory:

```bash
cd e-commerce-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in your terminal.

### 4. Create a Production Build

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

## Project Structure

The following is an illustrative structure. Update it to match the actual repository.

```text
src/
├── app/
│   └── store.js
│
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
│
├── features/
│   └── cart/
│       └── cartSlice.js
│
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   └── Cart.jsx
│
├── services/
│   └── productApi.js
│
├── routes/
│
├── App.jsx
└── main.jsx
```

## Project Scope

This repository currently focuses on frontend development.

- Product information is retrieved from the DummyJSON API.
- Shopping cart operations are handled on the frontend using Redux Toolkit.
- React Router manages client-side navigation.
- There is no custom Spring Boot backend.
- There is no Hibernate or MySQL database integration.
- Real authentication, payment processing, and backend order management are not included unless implemented separately.

## Future Enhancements

Potential improvements for future development:

- Integrate a custom Spring Boot REST API.
- Implement user registration and authentication.
- Persist shopping cart data across browser sessions.
- Add backend order management.
- Integrate a payment gateway.
- Add automated frontend testing.
- Deploy the application to a hosting platform.

## Author

**Mahesh Savkar**

- GitHub: [student-mahesh](https://github.com/student-mahesh)
- LinkedIn: [mahesh-savkar](https://www.linkedin.com/in/mahesh-savkar-300377294/)

---

*Built as a frontend development project to practise React, JavaScript, API integration, routing, and Redux Toolkit.*
