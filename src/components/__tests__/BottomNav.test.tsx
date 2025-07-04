import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BottomNav from '../BottomNav'

// Mock SvgIcon component to avoid loading actual SVGs in tests
jest.mock('../SvgIcon', () => ({
  SvgIcon: ({ name, className }: { name: string; className?: string }) => (
    <div data-testid={`svg-${name}`} className={className}>{name}</div>
  ),
}))

describe('BottomNav Component', () => {
  const mockTabChange = jest.fn()
  
  beforeEach(() => {
    mockTabChange.mockClear()
  })
  
  it('renders all navigation items', () => {
    render(<BottomNav />)
    
    // Test for navigation items by their aria-label
    expect(screen.getByLabelText('Navigate to Home')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Cards')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Payments')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Credit')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Profile')).toBeInTheDocument()
  })
  
  it('only Cards tab is active and clickable', () => {
    render(<BottomNav onTabChange={mockTabChange} />)
    const cardsButton = screen.getByLabelText('Navigate to Cards')
    expect(cardsButton).not.toBeDisabled()
    fireEvent.click(cardsButton)
    expect(mockTabChange).toHaveBeenCalledWith('my-debit-cards')

    // All other buttons should be disabled
    expect(screen.getByLabelText('Navigate to Home')).toBeDisabled()
    expect(screen.getByLabelText('Navigate to Payments')).toBeDisabled()
    expect(screen.getByLabelText('Navigate to Credit')).toBeDisabled()
    expect(screen.getByLabelText('Navigate to Profile')).toBeDisabled()
  })
  
  it('is only visible on mobile screens', () => {
    render(<BottomNav />)
    
    const navElement = screen.getByRole('navigation')
    expect(navElement).toHaveClass('md:hidden')
  })
  
  it('has white background with top border and shadow', () => {
    render(<BottomNav />)
    
    const navElement = screen.getByRole('navigation')
    expect(navElement).toHaveClass('bg-white')
    expect(navElement).toHaveClass('border-t')
    expect(navElement).toHaveClass('shadow-[0_-4px_8px_rgba(0,0,0,0.05)]')
  })
})
