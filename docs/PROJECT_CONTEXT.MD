# PROJECT CONTEXT — ShopVibe

## 1. Project Overview

ShopVibe is a frontend-only e-commerce application developed using React and JavaScript.

The application demonstrates product browsing, search, category filtering, product details, shopping cart management, registration, login, checkout, order confirmation, and order history.

## 2. Technology Stack

- React 19
- JavaScript
- Vite 8
- React Router
- Redux Toolkit
- React Redux
- Bootstrap 5
- DummyJSON Products API
- Browser localStorage
- Vitest
- Oxlint
- Git and GitHub

## 3. Main Features

### Product Management
- Retrieve product information from DummyJSON.
- Display product listings and product details.
- Support product search and category filtering.

### Shopping Cart
- Add products to the cart.
- Update product quantities.
- Remove products.
- Calculate item quantities and subtotal.
- Persist supported cart data in localStorage.

### User and Order Workflows
- Frontend registration and login demonstration.
- Protected frontend routes.
- Checkout workflow.
- Order confirmation with order ID and product information.
- Order history using browser-side persistence.

## 4. Source Code Organization

- `components/`: Shared interface components.
- `layouts/`: Application layout.
- `pages/`: Home, products, product details, login, registration, cart, checkout, orders, order confirmation, and protected routes.
- `redux/`: Redux store, cart state, order state, and persistence utilities.
- `utils/`: Reusable utility functions.
- `assets/`: Images and frontend assets.

## 5. Repository Information

**GitHub repository:**

https://github.com/student-mahesh/ShopVibe-E-commerce-

**Local project directory:**

`D:\e-commerce-platform`

**Main branch:** `main`

## 6. Development Commands

Run these commands from the `frontend/` directory.

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
npm run preview
```

## 7. Project Scope and Limitations

- This is a frontend-only application.
- DummyJSON provides external sample product data.
- Authentication is a demonstration workflow and is not production-secure.
- Cart and order persistence use browser localStorage.
- No backend API is implemented.
- No MySQL database integration exists.
- No Hibernate/JPA persistence layer exists.
- No real payment gateway is integrated.
- Orders are browser-side demonstration records, not server-managed transactions.

The repository's `database/` directory is currently empty.

## 8. Quality Checks

Previously verified:

- Production build passed.
- Lint checks passed.
- Automated frontend tests passed.
- Manual customer journey tested: registration, adding products, placing an order, viewing order confirmation, and cart clearing.

## 9. Development Principle

Keep documentation aligned with the actual implementation. Do not describe planned backend, database, payment, or security functionality as already implemented.
