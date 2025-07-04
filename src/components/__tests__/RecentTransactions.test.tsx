import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import RecentTransactions from '../RecentTransactions'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => <div {...props}>{children}</div>,
  },
}))

interface Transaction {
  id: string
  merchant: string
  amount: number
  type: string
  date: string
  iconName: string
  iconColor: string
  description: string
}

describe('RecentTransactions Component', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Starbucks',
      amount: -50.00,
      type: 'debit',
      date: '01 Dec 2023',
      iconName: 'business-and-finance',
      iconColor: '#009DFF',
      description: 'Coffee Shop',
    },
    {
      id: '2',
      merchant: 'Shell',
      amount: -25.99,
      type: 'debit',
      date: '02 Dec 2023',
      iconName: 'flights',
      iconColor: '#00D4AA',
      description: 'Gas Station',
    },
    {
      id: '3',
      merchant: 'Company Inc',
      amount: 1000.00,
      type: 'credit',
      date: '03 Dec 2023',
      iconName: 'megaphone',
      iconColor: '#FF6B6B',
      description: 'Salary Deposit',
    },
  ]

  const mockSetIsTransactionsExpanded = jest.fn()

  beforeEach(() => {
    mockSetIsTransactionsExpanded.mockClear()
  })

  it('renders transaction header', () => {
    const { getByText } = render(
      <RecentTransactions 
        transactions={mockTransactions} 
        isTransactionsExpanded={true}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    expect(getByText('Recent transactions')).toBeInTheDocument()
  })

  it('toggles expanded state when header is clicked', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(
      <RecentTransactions 
        transactions={mockTransactions} 
        isTransactionsExpanded={false}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    const toggleButton = getByRole('button')
    await user.click(toggleButton)
    
    expect(mockSetIsTransactionsExpanded).toHaveBeenCalledWith(true)
  })

  it('displays transactions when expanded', () => {
    const { getByText } = render(
      <RecentTransactions 
        transactions={mockTransactions} 
        isTransactionsExpanded={true}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    expect(getByText('Starbucks')).toBeInTheDocument()
    expect(getByText('Shell')).toBeInTheDocument()
    expect(getByText('Company Inc')).toBeInTheDocument()
  })

  it('hides transactions when collapsed', () => {
    const { queryByText } = render(
      <RecentTransactions 
        transactions={mockTransactions} 
        isTransactionsExpanded={false}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    expect(queryByText('Starbucks')).not.toBeInTheDocument()
  })

  it('displays transaction amounts correctly', () => {
    const { getByText } = render(
      <RecentTransactions 
        transactions={mockTransactions} 
        isTransactionsExpanded={true}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    expect(getByText('- S$ 50')).toBeInTheDocument()
    expect(getByText('- S$ 25.99')).toBeInTheDocument()
    expect(getByText('+ S$ 1000')).toBeInTheDocument()
  })

  it('shows empty state when no transactions', () => {
    const { container } = render(
      <RecentTransactions 
        transactions={[]} 
        isTransactionsExpanded={true}
        setIsTransactionsExpanded={mockSetIsTransactionsExpanded}
      />
    )
    
    // The component doesn't actually have a "No transactions yet" text
    // Instead verify that there are no transaction items
    const emptyContentContainer = container.querySelector('.overflow-y-auto')
    expect(emptyContentContainer).toBeInTheDocument()
    expect(emptyContentContainer?.children.length).toBe(0)
  })
})
