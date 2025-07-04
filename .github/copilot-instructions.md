<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Aspire Card Challenge - Copilot Instructions

This is a modern React/Next.js application for card management with the following stack:

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Storage**: localStorage for persistence

## Project Structure
- `/src/app/` - Next.js App Router pages
- `/src/components/` - Reusable React components
- `/src/hooks/` - Custom React hooks (React Query)
- `/src/lib/` - Utilities and API functions
- `/src/types/` - TypeScript type definitions

## Key Features
1. **Card Management**: Create, view, freeze/unfreeze cards
2. **Card Carousel**: Interactive carousel with navigation
3. **Modern UI**: Glassmorphism design with animations
4. **Form Validation**: Zod schemas with error handling
5. **Mock API**: localStorage-based data persistence
6. **Responsive Design**: Mobile-first approach

## Code Style Guidelines
- Use TypeScript with strict types
- Prefer functional components with hooks
- Use Tailwind CSS for styling
- Follow React Query patterns for data fetching
- Use Framer Motion for smooth animations
- Implement proper error boundaries and loading states

## API Patterns
- All API functions return Promises
- Use React Query for caching and state management
- Mock API delays for realistic UX
- Handle loading, error, and success states

## Component Patterns
- Extract reusable components
- Use proper TypeScript interfaces
- Implement accessibility features
- Use motion components for animations
- Follow compound component patterns where appropriate
