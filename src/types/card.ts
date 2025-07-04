export interface Card {
  id: string
  name: string
  cardNumber: string
  expirationDate: string
  cvv: string
  balance: number
  isFrozen: boolean
  isDefault: boolean
  cardType: 'debit' | 'credit'
  createdAt: Date
  updatedAt: Date
}

export interface CreateCardData {
  name: string
}

export interface UpdateCardData {
  id: string
  name?: string
  isFrozen?: boolean
  isDefault?: boolean
}

export interface CardApiResponse {
  success: boolean
  data: Card | Card[]
  message?: string
}

export interface SpendingLimit {
  id: string
  cardId: string
  type: 'weekly' | 'monthly'
  amount: number
  spent: number
  isActive: boolean
}

export interface Transaction {
  id: string
  cardId: string
  amount: number
  description: string
  type: 'debit' | 'credit'
  category: string
  date: Date
  merchant: string
}
