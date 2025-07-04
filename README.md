# 💳 Aspire Card Challenge

A modern, responsive card management application built with Next.js 15, featuring advanced UI components, smooth animations, and a comprehensive card management system. This project demonstrates best practices in React development, TypeScript implementation, and modern web application architecture.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)
![React Query](https://img.shields.io/badge/React_Query-5.81.5-FF4154)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Installation](#-installation)
- [📖 Usage](#-usage)
- [🔌 API Reference](#-api-reference)
- [📁 Folder Structure](#-folder-structure)
- [🧪 Testing](#-testing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Features
- **Card Management**: Create, view, freeze/unfreeze, and delete cards
- **Interactive Card Carousel**: Smooth navigation between multiple cards
- **Responsive Design**: Mobile-first approach with perfect mobile/desktop layouts
- **Real-time Updates**: Live card previews and instant state updates
- **Form Validation**: Robust form handling with Zod schema validation

### 🎨 UI/UX Features
- **Glassmorphism Design**: Modern frosted glass aesthetic
- **Smooth Animations**: Framer Motion powered transitions
- **Mobile Bottom Navigation**: Native mobile app experience
- **Skeleton Loading**: Professional loading states
- **Error Boundaries**: Graceful error handling

### 🔧 Technical Features
- **TypeScript**: Fully typed codebase for better development experience
- **React Query**: Efficient state management and caching
- **LocalStorage API**: Persistent data storage without backend
- **Component Testing**: Comprehensive test coverage
- **Accessibility**: WCAG compliant components

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library

### State Management & Forms
- **[TanStack React Query](https://tanstack.com/query)** - Server state management
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Development & Testing
- **[Jest](https://jestjs.io/)** - Testing framework
- **[React Testing Library](https://testing-library.com/)** - Component testing
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Installation

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aspire-card-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📖 Usage

### Basic Navigation
1. **Desktop**: Use the left sidebar to navigate between sections
2. **Mobile**: Use the bottom navigation bar to switch between tabs

### Card Management
1. **Create Card**: Click the "New card" button and fill in the card details
2. **View Cards**: Browse through cards using the carousel navigation
3. **Freeze/Unfreeze**: Use the freeze button to temporarily disable a card
4. **Card Actions**: Access additional options like spend limits and GPay integration

### Features Overview
- **Account Balance**: View your current available balance
- **Card Details**: Expandable section showing card information
- **Recent Transactions**: Scrollable list of recent card activities
- **Responsive Design**: Seamless experience across all devices

## � API Reference

The application uses a mock API layer that simulates real backend operations using localStorage.

### Card Operations

#### Get All Cards
```typescript
cardApi.getCards(): Promise<Card[]>
```
**Response:**
```json
[
  {
    "id": "card-1",
    "name": "Mark Henry",
    "cardNumber": "4123************",
    "expirationDate": "12/27",
    "cvv": "***",
    "balance": 3000,
    "isFrozen": false,
    "isDefault": true,
    "cardType": "debit",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### Create New Card
```typescript
cardApi.createCard(data: CreateCardData): Promise<Card>
```
**Request:**
```json
{
  "name": "John Doe"
}
```

#### Update Card
```typescript
cardApi.updateCard(data: UpdateCardData): Promise<Card>
```
**Request:**
```json
{
  "id": "card-1",
  "isFrozen": true
}
```

#### Delete Card
```typescript
cardApi.deleteCard(id: string): Promise<boolean>
```

### React Query Hooks

```typescript
// Get all cards
const { data: cards, isLoading, error } = useCards()

// Create new card
const createCard = useCreateCard()

// Update card
const updateCard = useUpdateCard()

// Toggle freeze status
const toggleFreeze = useToggleCardFreeze()
```

## 📁 Folder Structure

```
aspire-card-challenge/
├── 📁 public/
│   └── 📁 assets/          # SVG icons and images
├── 📁 src/
│   ├── 📁 app/            # Next.js App Router pages
│   │   ├── favicon.ico
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── 📁 components/     # React components
│   │   ├── 📁 ui/         # Base UI components
│   │   ├── 📁 __tests__/  # Component tests
│   │   ├── AddCardModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── CardActions.tsx
│   │   ├── CardDetails.tsx
│   │   ├── CardDisplay.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── providers.tsx
│   │   ├── RecentTransactions.tsx
│   │   ├── SidebarNav.tsx
│   │   └── SvgIcon.tsx
│   ├── 📁 hooks/          # Custom React hooks
│   │   └── useCards.ts    # Card management hooks
│   ├── 📁 lib/            # Utility functions
│   │   ├── api.ts         # Mock API layer
│   │   ├── constants.ts   # App constants
│   │   ├── data.ts        # Mock data
│   │   └── react-query.ts # Query client config
│   └── 📁 types/          # TypeScript definitions
│       └── card.ts        # Card-related types
├── 📄 jest.config.js      # Jest configuration
├── 📄 jest.setup.ts       # Jest setup file
├── 📄 next.config.ts      # Next.js configuration
├── 📄 tailwind.config.js  # Tailwind CSS configuration
└── 📄 tsconfig.json       # TypeScript configuration
```

## 🧪 Testing

The project includes comprehensive testing with Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Coverage

- ✅ **Component Tests**: All major UI components
- ✅ **Hook Tests**: Custom React Query hooks
- ✅ **Integration Tests**: Component interactions
- ✅ **Accessibility Tests**: ARIA compliance

### Test Files
```
src/components/__tests__/
├── AddCardModal.test.tsx
├── BottomNav.test.tsx
├── CardActions.test.tsx
├── CardDisplay.test.tsx
├── RecentTransactions.test.tsx
└── Skeleton.test.tsx
```

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Coding Standards

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured linting rules
- **Prettier**: Format code consistently
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Aspire Card Challenge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

Made with ❤️ by Sonal Sood

[⬆ Back to Top](#-aspire-card-challenge)

</div>

