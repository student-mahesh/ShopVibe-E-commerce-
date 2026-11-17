# ShopVibe — E-Commerce Frontend

ShopVibe is a responsive frontend e-commerce application built using React and JavaScript. It provides product browsing, search, category filtering, product details, shopping cart management, user registration, login, checkout, order confirmation, and order history.

Product information is retrieved from the [DummyJSON Products API](https://dummyjson.com/docs/products). Redux Toolkit manages cart and order state, while browser localStorage provides demonstration persistence.

## Features

- **Product Catalogue:** Browse products from DummyJSON.
- **Product Search:** Search for products.
- **Category Filtering:** Filter products by category.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Cart Calculations:** View item quantities and subtotal.
- **User Registration and Login:** Frontend demonstration authentication.
- **Protected Routes:** Restrict access to selected pages.
- **Checkout:** Complete the frontend checkout workflow.
- **Order Confirmation:** Display order confirmation and order ID.
- **Order History:** View previously placed demonstration orders.
- **Persistent State:** Use browser localStorage for supported cart, authentication, and order data.
- **Responsive Design:** Bootstrap-based responsive interface.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| JavaScript | Application logic |
| Vite 8 | Development server and build tool |
| React Router | Client-side navigation |
| Redux Toolkit | Cart and order state management |
| React Redux | Redux integration with React |
| Bootstrap 5 | Responsive styling |
| DummyJSON API | External product data |
| localStorage | Browser-side demonstration persistence |
| Vitest | Automated testing |
| Oxlint | Code linting |
| Git and GitHub | Version control |

## Application Architecture

ShopVibe follows a component-based React architecture.

1. Product information is retrieved from DummyJSON.
2. React components display products and product details.
3. Redux Toolkit manages shopping cart and order state.
4. Users can register, log in, and access protected pages.
5. Users can add products to the cart and proceed to checkout.
6. Order confirmation and order history use browser-side persistence.

## Project Structure

```text
ShopVibe-E-commerce-/
├── docs/
│   └── PROJECT_CONTEXT.MD
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── redux/
│       ├── utils/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/student-mahesh/ShopVibe-E-commerce-.git
```

### 2. Navigate to the frontend directory

```bash
cd ShopVibe-E-commerce-/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### 5. Create a production build

```bash
npm run build
```

### 6. Run automated tests

```bash
npm test
```

### 7. Run lint checks

```bash
npm run lint
```

## Project Scope and Limitations

ShopVibe is currently a frontend-only application.

- Product information comes from the external DummyJSON API.
- Cart and order state are managed on the frontend.
- Supported data is persisted using browser localStorage.
- Authentication is a demonstration workflow, not production-secure server authentication.
- There is no implemented backend API.
- There is no integrated MySQL database or Hibernate/JPA layer.
- Checkout does not process real payments.
- Orders are browser-side demonstration records, not server-managed transactions.
- Product data depends on the availability of the external API.

## Future Enhancements

- Integrate a backend REST API.
- Implement secure server-side authentication.
- Add database-backed product and order management.
- Integrate a real payment gateway.
- Deploy the application.

## Author

**Mahesh Savkar**

- GitHub: [student-mahesh](https://github.com/student-mahesh)
- LinkedIn: [Mahesh Savkar](https://www.linkedin.com/in/mahesh-savkar-300377294/)

---

*ShopVibe — A frontend e-commerce project built with React, JavaScript, Redux Toolkit, and Bootstrap.*
