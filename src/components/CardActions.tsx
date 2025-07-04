import { SvgIcon } from './SvgIcon'
import { memo } from 'react'
import type { Card } from '@/types/card'
import { cardActionsConfig } from '@/lib/data'

interface CardActionsProps {
  currentCard: Card
  handleFreezeCard: () => void
}

type CardAction = 'freeze' | 'spend-limit' | 'gpay' | 'replace' | 'cancel'

// Sub-component for individual action button
interface ActionButtonProps {
  iconName: string
  label: string
  onClick?: () => void
  disabled?: boolean
}

const ActionButton = memo(function ActionButton({ iconName, label, onClick, disabled = false }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      aria-label={label.replace(/\n/g, ' ')}
      className="flex flex-col items-center flex-1 p-1 sm:p-2 transition-opacity hover:opacity-80 disabled:opacity-50 focus:outline-none rounded-lg"
    >
      <div className="mb-1 sm:mb-2">
        <SvgIcon 
          name={iconName} 
          width={28} 
          height={28} 
          className="sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px]" 
        />
      </div>
      <span className="text-xs text-gray-900 font-semibold text-center leading-tight">
        {label}
      </span>
    </button>
  )
})

export default function CardActions({ currentCard, handleFreezeCard }: CardActionsProps) {
  // Action handlers map
  const actionHandlers: Record<CardAction, () => void> = {
    freeze: handleFreezeCard,
    'spend-limit': () => console.log('Set spend limit'),
    gpay: () => console.log('Add to GPay'),
    replace: () => console.log('Replace card'),
    cancel: () => console.log('Cancel card'),
  }

  return (
    <div className="bg-[#EDF3FF] rounded-xl sm:rounded-2xl py-4 sm:py-6 px-2 sm:px-4 flex justify-center items-center sm:mb-8">
      <div className="flex flex-row gap-1 sm:gap-2 md:gap-4 lg:gap-6 w-full justify-between">
        {cardActionsConfig.map((action) => (
          <ActionButton
            key={action.id}
            iconName={action.iconName}
            label={action.getLabel(currentCard.isFrozen)}
            onClick={actionHandlers[action.action]}
          />
        ))}
      </div>
    </div>
  )
}
