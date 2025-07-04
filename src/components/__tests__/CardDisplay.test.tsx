import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CardDisplay from '../CardDisplay'
import type { Card } from '@/types/card'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<unknown>) => children,
}))

describe('CardDisplay Component', () => {
  const mockCards: Card[] = [
    {
      id: '1',
      name: 'Test Card 1',
      cardNumber: '1234567890123456',
      expirationDate: '12/25',
      cvv: '123',
      balance: 1000,
      isFrozen: false,
      isDefault: true,
      cardType: 'debit',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Test Card 2',
      cardNumber: '6543210987654321',
      expirationDate: '06/26',
      cvv: '456',
      balance: 500,
      isFrozen: true,
      isDefault: false,
      cardType: 'credit',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const mockSetActiveIndex = jest.fn()

  beforeEach(() => {
    mockSetActiveIndex.mockClear()
  })

  it('renders card when valid props are provided', () => {
    const { getByText } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    expect(getByText('Test Card 1')).toBeInTheDocument()
    expect(getByText('Thru: 12/25')).toBeInTheDocument()
  })

  it('shows masked card number when showCardNumber is false', () => {
    const { getByText } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    // Should show last 4 digits
    expect(getByText('3456')).toBeInTheDocument()
  })

  it('shows CVV when showCardNumber is true', () => {
    const { getByText } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={true}
      />
    )
    
    // Check for the CVV value
    expect(getByText('123')).toBeInTheDocument()
  })

  it('shows frozen overlay for frozen cards', () => {
    const { getByText } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={1}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    expect(getByText('Card Frozen')).toBeInTheDocument()
  })

  it('renders navigation dots when multiple cards', () => {
    const { container } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    const dots = container.querySelectorAll('button[aria-label*="Go to card"]')
    expect(dots).toHaveLength(2)
  })

  it('returns null when no cards provided', () => {
    const { container } = render(
      <CardDisplay
        cards={[]}
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('returns null when activeIndex is out of bounds', () => {
    const { container } = render(
      <CardDisplay
        cards={mockCards}
        activeIndex={5}
        setActiveIndex={mockSetActiveIndex}
        showCardNumber={false}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })
})
