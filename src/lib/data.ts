export const defaultCard = {
  id: 'default',
  name: 'Mark Henry',
  cardNumber: '5647 8312 9023 2020',
  expirationDate: '12/20',
  cvv: '456',
  balance: 3000,
  isFrozen: false,
  isDefault: true,
  cardType: 'debit' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockTransactions = [
  {
    id: '1',
    merchant: 'Hamleys',
    amount: 150,
    type: 'refund' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Refund on debit card'
  },
  {
    id: '2', 
    merchant: 'Hamleys',
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'flights',
    iconColor: '#00D6B51A',
    description: 'Charged to debit card'
  },
  {
    id: '3',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'megaphone',
    iconColor: '#F251951A',
    description: 'Charged to debit card'
  },
  {
    id: '4',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '5',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '6',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '7',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '8',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '9',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  },
  {
    id: '10',
    merchant: 'Hamleys', 
    amount: -150,
    type: 'charge' as const,
    date: '20 May 2020',
    iconName: 'file-storage',
    iconColor: '#009DFF1A',
    description: 'Charged to debit card'
  }
]

export const cardActionsConfig = [
  {
    id: 'freeze',
    iconName: 'Freeze card',
    getLabel: (isFrozen: boolean) => isFrozen ? 'Unfreeze\ncard' : 'Freeze\ncard',
    action: 'freeze' as const,
  },
  {
    id: 'spend-limit',
    iconName: 'Set spend limit',
    getLabel: () => 'Set\nspend limit',
    action: 'spend-limit' as const,
  },
  {
    id: 'gpay',
    iconName: 'GPay',
    getLabel: () => 'Add to\nGPay',
    action: 'gpay' as const,
  },
  {
    id: 'replace',
    iconName: 'Replace card',
    getLabel: () => 'Replace\ncard',
    action: 'replace' as const,
  },
  {
    id: 'cancel',
    iconName: 'Deactivate card',
    getLabel: () => 'Cancel\ncard',
    action: 'cancel' as const,
  },
] as const
