import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    render(<BottomNav activeTab="home" onTabChange={mockTabChange} />)
    
    // Test for navigation items by their aria-label
    expect(screen.getByRole('tab', { name: /navigate to home/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /navigate to cards/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /navigate to payments/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /navigate to credit/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /navigate to profile/i })).toBeInTheDocument()
  })
  
  it('applies active styles to the current tab', () => {
    render(<BottomNav activeTab="my-debit-cards" onTabChange={mockTabChange} />)
    
    // Test that the active icon has the green color class
    const activeIcon = screen.getByTestId('svg-Card')
    expect(activeIcon).toHaveClass('text-[#01d167]')
    
    // Test that inactive icons have the gray color class
    const inactiveIcon = screen.getByTestId('svg-Home')
    expect(inactiveIcon).toHaveClass('text-[#DDDDDD]')
    
    // Test that label text has correct active color
    const cardsTab = screen.getByRole('tab', { name: /navigate to cards/i })
    const cardsLabel = cardsTab.querySelector('span')
    expect(cardsLabel).toHaveClass('text-[#01d167]')
    
    // Test that label text has correct inactive color
    const homeTab = screen.getByRole('tab', { name: /navigate to home/i })
    const homeLabel = homeTab.querySelector('span')
    expect(homeLabel).toHaveClass('text-[#DDDDDD]')
  })
  
  it('calls onTabChange when a tab is clicked', async () => {
    const user = userEvent.setup()
    render(<BottomNav activeTab="home" onTabChange={mockTabChange} />)
    
    const cardsTab = screen.getByRole('tab', { name: /navigate to cards/i })
    await user.click(cardsTab)
    
    expect(mockTabChange).toHaveBeenCalledWith('my-debit-cards')
  })
  
  it('is only visible on mobile screens', () => {
    render(<BottomNav activeTab="home" onTabChange={mockTabChange} />)
    
    const navElement = screen.getByRole('navigation')
    expect(navElement).toHaveClass('md:hidden')
  })
  
  it('has white background with top border and shadow', () => {
    render(<BottomNav activeTab="home" onTabChange={mockTabChange} />)
    
    const navElement = screen.getByRole('navigation')
    expect(navElement).toHaveClass('bg-white')
    expect(navElement).toHaveClass('border-t')
    expect(navElement).toHaveClass('shadow-[0_-4px_8px_rgba(0,0,0,0.05)]')
  })
})
