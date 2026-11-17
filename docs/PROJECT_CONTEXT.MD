# PROJECT CONTEXT — ShopVibe

## 1. Project Overview

ShopVibe is a responsive frontend-only e-commerce application developed using React and JavaScript.

The application demonstrates a complete client-side shopping workflow, including product browsing, search, category filtering, product details, shopping cart management, user registration, login, checkout, order confirmation, and order history.

Product information is retrieved from the DummyJSON Products API. Redux Toolkit manages cart and order state, while browser localStorage provides demonstration persistence.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface development |
| JavaScript | Application logic |
| Vite 8 | Development server and production build |
| React Router | Client-side routing |
| Redux Toolkit | Cart and order state management |
| React Redux | Redux integration with React |
| Bootstrap 5 | Responsive styling and layout |
| DummyJSON Products API | External product data |
| Browser localStorage | Client-side demonstration persistence |
| Vitest | Automated unit testing |
| Oxlint | Code linting |
| Git and GitHub | Version control and source hosting |

## 3. Main Features

### Product Catalogue
- Retrieve product information from the DummyJSON API.
- Display product listings.
- View individual product details.
- Search for products.
- Filter products by category.

### Shopping Cart
- Add products to the cart.
- Update product quantities.
- Remove products from the cart.
- Calculate item quantities and subtotal.
- Persist supported cart data using localStorage.

### User Authentication Demonstration
- Frontend user registration.
- Frontend login workflow.
- Protected frontend routes.
- Browser-side authentication state persistence.

### Checkout and Orders
- Review cart items before checkout.
- Complete the frontend checkout workflow.
- Generate an order confirmation.
- Display an order ID and ordered product information.
- View previously placed demonstration orders.
- Clear the cart after successful order placement.

## 4. Application Architecture

ShopVibe follows a component-based React architecture.

1. DummyJSON provides external product information.
2. React components display product listings and details.
3. Redux Toolkit manages shopping cart and order state.
4. React Router handles client-side navigation.
5. Registration and login provide a frontend demonstration authentication workflow.
6. Protected routes restrict access to selected pages.
7. Checkout creates browser-side demonstration order records.
8. localStorage maintains supported cart, authentication, and order data.

## 5. Source Code Organization

```text
ShopVibe-E-commerce-/
├── docs/
│   └── PROJECT_CONTEXT.MD
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── cartSlice.js
│   │   │   ├── cartSlice.test.js
│   │   │   ├── orderSlice.js
│   │   │   ├── persistence.js
│   │   │   └── store.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatPrice.js
│   │   │   └── formatPrice.test.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 6. Repository Information

**Project Name:** ShopVibe — E-Commerce Frontend

**GitHub Repository:**
https://github.com/student-mahesh/ShopVibe-E-commerce-

**Local Project Directory:**
`D:\e-commerce-platform`

**Main Branch:** `main`

## 7. Development Setup

### Prerequisites
- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/student-mahesh/ShopVibe-E-commerce-.git
```

### Navigate to the Frontend

```bash
cd ShopVibe-E-commerce-/frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

### Run Automated Tests

```bash
npm test
```

### Run Lint Checks

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## 8. Testing and Quality Checks

Previously verified project checks:

| Check | Result |
|---|---|
| Automated test files | 2 passed |
| Automated unit tests | 3 passed |
| Production build | Passed |
| Oxlint | 0 warnings, 0 errors |
| Manual registration and shopping workflow | Tested |

Automated unit tests currently cover:
- Price formatting utility.
- Shopping cart state logic.

The manual customer journey previously tested includes registration, adding products to the cart, placing an order, viewing the order ID and product information, and verifying that the cart is cleared after order placement.

These checks do not represent a complete automated end-to-end test suite.

## 9. Project Scope and Limitations

ShopVibe is currently a frontend-only application.

- Product information is retrieved from the external DummyJSON API.
- Cart and order state are managed on the frontend.
- Supported application data is persisted using browser localStorage.
- Authentication is a frontend demonstration workflow, not production-secure server authentication.
- There is no implemented backend API.
- There is no integrated MySQL database.
- There is no Hibernate or JPA persistence layer.
- There is no real payment gateway integration.
- Orders are browser-side demonstration records, not server-managed transactions.
- Application data stored in localStorage is not suitable for sensitive production information.
- Product availability depends on the external DummyJSON API.

The repository does not contain an implemented backend or database integration.

## 10. Possible Future Enhancements

- Develop a backend REST API.
- Implement secure server-side authentication and authorization.
- Integrate database-backed product and order management.
- Add real payment gateway integration.
- Expand automated component and end-to-end testing.
- Deploy the application to a hosting platform.

These are future enhancements, not currently implemented features.

## 11. Development Principle

Keep project documentation aligned with the actual source code.

Do not describe planned backend, database, payment, or security functionality as already implemented.

**ShopVibe is a React-based frontend e-commerce demonstration project.**
