import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CardActions from '../CardActions'
import { cardActionsConfig } from '@/lib/data'
import type { Card } from '@/types/card'

describe('CardActions Component', () => {
  const mockFreeze = jest.fn()
  // Minimal Card object matching type
  const baseCard: Card = {
    id: '1',
    name: 'Test Card',
    cardNumber: '**** **** **** ****',
    expirationDate: '12/34',
    cvv: '123',
    balance: 100,
    isFrozen: false,
    isDefault: false,
    cardType: 'debit',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(() => {
    mockFreeze.mockClear()
  })

  it('renders all action buttons', () => {
    const { getAllByRole } = render(
      <CardActions currentCard={baseCard} handleFreezeCard={mockFreeze} />
    )
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(cardActionsConfig.length)
  })

  it('shows Freeze card when not frozen and Unfreeze card when frozen', () => {
    const { getByLabelText, rerender } = render(
      <CardActions currentCard={{ ...baseCard, isFrozen: false }} handleFreezeCard={mockFreeze} />
    )
    expect(getByLabelText('Freeze card')).toBeInTheDocument()

    rerender(
      <CardActions currentCard={{ ...baseCard, isFrozen: true }} handleFreezeCard={mockFreeze} />
    )
    expect(getByLabelText('Unfreeze card')).toBeInTheDocument()
  })

  it('calls handleFreezeCard on click', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(
      <CardActions currentCard={baseCard} handleFreezeCard={mockFreeze} />
    )
    const btn = getByLabelText('Freeze card')
    await user.click(btn)
    expect(mockFreeze).toHaveBeenCalledTimes(1)
  })
})
