import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { AddCardModal } from '../AddCardModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('AddCardModal Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders modal when isOpen is true', () => {
    const { getByText } = renderWithQueryClient(
      <AddCardModal isOpen={true} onClose={mockOnClose} />
    )
    expect(getByText('Add New Card')).toBeInTheDocument()
    expect(getByText('Create a new debit card')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    const { queryByText } = renderWithQueryClient(
      <AddCardModal isOpen={false} onClose={mockOnClose} />
    )
    expect(queryByText('Add New Card')).not.toBeInTheDocument()
  })

  it('renders card preview with default name', () => {
    const { getByText } = renderWithQueryClient(
      <AddCardModal isOpen={true} onClose={mockOnClose} />
    )
    expect(getByText('New Debit Card')).toBeInTheDocument()
  })

  it('updates card preview when typing card name', async () => {
    const user = userEvent.setup()
    const { getByPlaceholderText, getByText } = renderWithQueryClient(
      <AddCardModal isOpen={true} onClose={mockOnClose} />
    )
    
    const input = getByPlaceholderText('e.g., My Savings Card')
    await user.type(input, 'My Test Card')
    
    expect(getByText('My Test Card')).toBeInTheDocument()
  })

  it('shows validation error for invalid input', async () => {
    const user = userEvent.setup()
    const { getByPlaceholderText, getByText, getByRole } = renderWithQueryClient(
      <AddCardModal isOpen={true} onClose={mockOnClose} />
    )
    
    const input = getByPlaceholderText('e.g., My Savings Card')
    await user.type(input, 'A')
    
    const submitButton = getByRole('button', { name: /add card/i })
    await user.click(submitButton)
    
    expect(getByText('Card name must be at least 2 characters')).toBeInTheDocument()
  })

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderWithQueryClient(
      <AddCardModal isOpen={true} onClose={mockOnClose} />
    )
    
    const cancelButton = getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
