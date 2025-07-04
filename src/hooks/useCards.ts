import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cardApi } from '@/lib/api'
import { CreateCardData, UpdateCardData } from '@/types/card'

// Query Keys
export const cardKeys = {
  all: ['cards'] as const,
  lists: () => [...cardKeys.all, 'list'] as const,
  list: (filters: string) => [...cardKeys.lists(), { filters }] as const,
  details: () => [...cardKeys.all, 'detail'] as const,
  detail: (id: string) => [...cardKeys.details(), id] as const,
}

// Get all cards
export const useCards = () => {
  return useQuery({
    queryKey: cardKeys.lists(),
    queryFn: cardApi.getCards,
  })
}

// Get single card
export const useCard = (id: string) => {
  return useQuery({
    queryKey: cardKeys.detail(id),
    queryFn: () => cardApi.getCard(id),
    enabled: !!id,
  })
}

// Create card mutation
export const useCreateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCardData) => cardApi.createCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.lists() })
    },
    onError: (error) => {
      console.error('Failed to create card:', error)
    },
  })
}

// Update card mutation
export const useUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCardData) => cardApi.updateCard(data),
    onSuccess: (updatedCard) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.lists() })
      queryClient.setQueryData(cardKeys.detail(updatedCard.id), updatedCard)
    },
    onError: (error) => {
      console.error('Failed to update card:', error)
    },
  })
}

// Delete card mutation
export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cardApi.deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.lists() })
    },
    onError: (error) => {
      console.error('Failed to delete card:', error)
    },
  })
}

// Freeze/Unfreeze card
export const useToggleCardFreeze = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isFrozen }: { id: string; isFrozen: boolean }) =>
      cardApi.updateCard({ id, isFrozen }),
    onSuccess: (updatedCard) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.lists() })
      queryClient.setQueryData(cardKeys.detail(updatedCard.id), updatedCard)
    },
    onError: (error) => {
      console.error('Failed to toggle card freeze:', error)
    },
  })
}
