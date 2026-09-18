# Base Orders

A modern order management application built with **Next.js, React, TypeScript and Tailwind CSS**.

This project was developed as part of a **Coodesh technical challenge**, with a focus on building a scalable, maintainable and well-structured front-end application using modern React ecosystem practices.

## 🚀 Live Demo

**[Open the application](https://base-orders-beige.vercel.app/)**

## 📋 About the Project

**Base Orders** is an order management interface designed to demonstrate the implementation of a modern front-end architecture.

The project includes features for working with orders and their related information, combining form management, schema validation, client-side state management, component-driven development and automated testing.

The application was designed with an emphasis on:

- Component reusability
- Type safety
- Form validation
- State management
- Responsive UI
- Code quality
- Automated testing
- Component documentation
- Separation of concerns

## 🛠️ Tech Stack

### Core

- **Next.js 16**
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

### State & Forms

- **Zustand** — client-side state management
- **React Hook Form** — form management
- **Zod** — schema validation
- **date-fns** — date manipulation

### Testing & Quality

- **Jest**
- **Testing Library**
- **Storybook**
- **ESLint**
- **Stylelint**

### Development API

The project includes a local **JSON Server** used to provide a lightweight REST API during development.

## 🏗️ Project Structure

The project follows a modular structure designed to keep application responsibilities separated:

```text
base-orders/
├── app/                 # Next.js application routes
├── components/          # Reusable UI components
├── docs/
│   └── patterns/        # Documented development patterns
├── lib/                 # Shared utilities and application logic
├── public/              # Static assets
├── server/              # Local JSON Server API and data
├── styles/              # Global styles
├── test/
│   └── mocks/           # Test mocks and fixtures
├── .storybook/          # Storybook configuration
└── ...
```

## ✨ Key Features

### Order Management

The application provides an interface for managing order-related information through reusable React components and structured application flows.

### Form Validation

Forms are implemented using **React Hook Form** with **Zod** schemas to provide type-safe validation and consistent error handling.

### State Management

**Zustand** is used to manage client-side application state while keeping state logic independent from presentation components.

### Component Development

The UI is developed using reusable components and documented through **Storybook**, making individual components easier to develop, test and maintain.

### Automated Testing

The project includes unit and component tests using **Jest** and **Testing Library**, helping ensure that application behavior remains reliable as the codebase evolves.

### Code Quality

The project uses ESLint and Stylelint to maintain consistent JavaScript/TypeScript and CSS code quality.

## 🔌 Local API

During development, the application can use the included JSON Server instance.

The API runs on:

```text
http://localhost:3001
```

The local database is located at:

```text
server/db.json
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- pnpm

### Installation

Clone the repository:

```bash
git clone https://github.com/atelesjr/base-orders.git
```

Navigate to the project:

```bash
cd base-orders
```

Install dependencies:

```bash
pnpm install
```

### Start the development environment

Start the Next.js application:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

In another terminal, start the local API:

```bash
pnpm server
```

The JSON Server will be available at:

```text
http://localhost:3001
```

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Run the complete test suite in watch mode:

```bash
pnpm test:watch:all
```

Generate the test coverage report:

```bash
pnpm test:coverage
```

## 📚 Storybook

Start Storybook:

```bash
pnpm storybook
```

Storybook will be available at:

```text
http://localhost:6006
```

To create a production Storybook build:

```bash
pnpm build-storybook
```

## 🔍 Code Quality

Run ESLint:

```bash
pnpm lint
```

Run Stylelint:

```bash
pnpm lint:css
```

## 🏭 Production Build

Create a production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 🎯 Technical Goals

This project demonstrates practical experience with:

- Modern React development
- Next.js App Router
- TypeScript
- Component-driven development
- Client-side state management
- Form management and validation
- Responsive UI development
- REST API integration
- Unit and component testing
- Storybook
- Code quality tooling
- Scalable project organization

## 📌 Technical Challenge

This project was developed as part of a technical challenge provided by **Coodesh**.

The repository is intended both as a demonstration of the implemented solution and as a practical example of modern front-end development using the React ecosystem.

## 👨‍💻 Author

**Agostinho Teles Jr.**

Front-End Developer specializing in **React.js, Next.js, TypeScript and modern web application architecture**.

- GitHub: [@atelesjr](https://github.com/atelesjr)
- LinkedIn: [linkedin.com/in/atelesjr](https://linkedin.com/in/atelesjr)

---

⭐ If you find this project useful, feel free to explore the code and the architecture.
