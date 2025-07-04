import { Card, CreateCardData, UpdateCardData } from '@/types/card'

// Generate random card number
export const generateCardNumber = (): string => {
  const prefix = '4123' // Visa prefix for testing
  const randomPart = Math.random().toString().slice(2, 14).padEnd(12, '0')
  console.log(`${prefix}${randomPart}`)
  return `${prefix}${randomPart}`
}

// Generate random expiration date (2-5 years from now)
export const generateExpirationDate = (): string => {
  const now = new Date()
  const futureYears = Math.floor(Math.random() * 4) + 2 // 2-5 years
  const futureDate = new Date(now.getFullYear() + futureYears, Math.floor(Math.random() * 12), 1)
  
  const month = (futureDate.getMonth() + 1).toString().padStart(2, '0')
  const year = futureDate.getFullYear().toString().slice(-2)
  
  return `${month}/${year}`
}

// Generate random CVV
export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString()
}

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Get cards from localStorage
const getCardsFromStorage = (): Card[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('aspire-cards')
  return stored ? JSON.parse(stored) : []
}

// Save cards to localStorage
const saveCardsToStorage = (cards: Card[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('aspire-cards', JSON.stringify(cards))
}

// Initialize default cards
const initializeDefaultCards = (): Card[] => {
  const defaultCards: Card[] = [
    {
      id: 'card-1',
      name: 'Mark Henry',
      cardNumber: generateCardNumber(),
      expirationDate: generateExpirationDate(),
      cvv: generateCVV(),
      balance: 3000,
      isFrozen: false,
      isDefault: true,
      cardType: 'debit',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'card-2',
      name: 'Susain Smith',
      cardNumber: generateCardNumber(),
      expirationDate: generateExpirationDate(),
      cvv: generateCVV(),
      balance: 5000,
      isFrozen: false,
      isDefault: false,
      cardType: 'debit',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  // Check if cards already exist
  const existingCards = getCardsFromStorage()
  if (existingCards.length === 0) {
    saveCardsToStorage(defaultCards)
    return defaultCards
  }
  
  return existingCards
}

// API Functions
export const cardApi = {
  // Get all cards
  getCards: async (): Promise<Card[]> => {
    await delay(500) // Simulate API delay
    return initializeDefaultCards()
  },

  // Get card by ID
  getCard: async (id: string): Promise<Card | null> => {
    await delay(300)
    const cards = getCardsFromStorage()
    return cards.find(card => card.id === id) || null
  },

  // Create new card
  createCard: async (data: CreateCardData): Promise<Card> => {
    await delay(800)
    
    const newCard: Card = {
      id: `card-${Date.now()}`,
      name: data.name,
      cardNumber: generateCardNumber(),
      expirationDate: generateExpirationDate(),
      cvv: generateCVV(),
      balance: 0,
      isFrozen: false,
      isDefault: false,
      cardType: 'debit',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const cards = getCardsFromStorage()
    const updatedCards = [...cards, newCard]
    saveCardsToStorage(updatedCards)
    
    return newCard
  },

  // Update card
  updateCard: async (data: UpdateCardData): Promise<Card> => {
    await delay(400)
    
    const cards = getCardsFromStorage()
    const cardIndex = cards.findIndex(card => card.id === data.id)
    
    if (cardIndex === -1) {
      throw new Error('Card not found')
    }

    // If setting as default, remove default from other cards
    if (data.isDefault) {
      cards.forEach(card => {
        if (card.id !== data.id) {
          card.isDefault = false
        }
      })
    }

    const updatedCard = {
      ...cards[cardIndex],
      ...data,
      updatedAt: new Date(),
    }

    cards[cardIndex] = updatedCard
    saveCardsToStorage(cards)
    
    return updatedCard
  },

  // Delete card
  deleteCard: async (id: string): Promise<boolean> => {
    await delay(400)
    
    const cards = getCardsFromStorage()
    const filteredCards = cards.filter(card => card.id !== id)
    
    if (filteredCards.length === cards.length) {
      throw new Error('Card not found')
    }

    saveCardsToStorage(filteredCards)
    return true
  },
}
