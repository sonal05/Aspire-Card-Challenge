import { motion, AnimatePresence } from 'framer-motion'
import { memo } from 'react'
import { SvgIcon } from './SvgIcon'
import type { Card } from '@/types/card'

interface CardDisplayProps {
  cards: Card[]
  activeIndex: number
  setActiveIndex: (idx: number) => void
  showCardNumber: boolean
}

// Sub-component for card number display
interface CardNumberProps {
  cardNumber: string
  showCardNumber: boolean
}

const CardNumber = memo(function CardNumber({ cardNumber, showCardNumber }: CardNumberProps) {
  if (showCardNumber) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-end text-sm sm:text-base tracking-widest">
            {cardNumber?.substring(i * 4, i * 4 + 4).padEnd(4, '•')}
          </span>
        ))}
      </>
    )
  }

  return (
    <>
      <span className="inline-flex items-end text-xl sm:text-2xl md:text-3xl">••••</span>
      <span className="inline-flex items-end text-xl sm:text-2xl md:text-3xl">••••</span>
      <span className="inline-flex items-end text-xl sm:text-2xl md:text-3xl">••••</span>
      <span className="inline-flex items-end text-sm sm:text-base">{cardNumber.slice(-4)}</span>
    </>
  )
})

// Sub-component for card details (expiration and CVV)
interface CardDetailsRowProps {
  expirationDate: string
  cvv: string
  showCardNumber: boolean
}

const CardDetailsRow = memo(function CardDetailsRow({ expirationDate, cvv, showCardNumber }: CardDetailsRowProps) {
  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6">
        <div className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wider">
          Thru: {expirationDate}
        </div>
        <div className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wider">
          CVV: <span className="text-white">{showCardNumber ? cvv : '***'}</span>
        </div>
      </div>
    </div>
  )
})

// Sub-component for frozen card overlay
interface FrozenOverlayProps {
  isVisible: boolean
}

function FrozenOverlay({ isVisible }: FrozenOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/90 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm sm:text-base">
        <SvgIcon name="Freeze card" width={14} height={14} className="sm:w-4 sm:h-4" />
        Card Frozen
      </div>
    </div>
  )
}

// Sub-component for card navigation dots
interface CardDotsProps {
  cards: Card[]
  activeIndex: number
  onCardSelect: (index: number) => void
}

function CardDots({ cards, activeIndex, onCardSelect }: CardDotsProps) {
  return (
    <div className="flex justify-center mt-4 sm:mt-6 gap-2">
      {cards.map((_, idx) => (
        <button
          key={idx}
          type="button"
          aria-label={`Go to card ${idx + 1}`}
          onClick={() => onCardSelect(idx)}
          className={`w-2 h-2 rounded-full transition-colors ${
            idx === activeIndex ? 'bg-[#01d167]' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

// Sub-component for individual card
interface CardProps {
  card: Card
  showCardNumber: boolean
  onDragEnd: (event: unknown, info: { offset: { x: number } }) => void
}

function Card({ card, showCardNumber, onDragEnd }: CardProps) {
  return (
    <motion.div
      key={card.id}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#01d167] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg"
      style={{ cursor: 'grab', touchAction: 'pan-y' }}
    >
      {/* Aspire Logo */}
      <div className="flex justify-end mb-4 sm:mb-6">
        <SvgIcon 
          name="Aspire Logo-1" 
          width={60} 
          height={16} 
          className="sm:w-[70px] sm:h-[19px] md:w-[80px] md:h-[22px]" 
        />
      </div>

      {/* Card Name */}
      <div className="mb-3 sm:mb-5">
        <div className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-white">
          {card.name}
        </div>
      </div>

      {/* Card Number */}
      <div className="mb-2">
        <div className="flex gap-2 sm:gap-3 md:gap-4 font-bold font-sans tracking-widest text-white items-center min-h-[32px] sm:min-h-[36px] md:min-h-[40px] text-sm sm:text-base">
          <CardNumber cardNumber={card.cardNumber} showCardNumber={showCardNumber} />
        </div>
      </div>

      {/* Card Details */}
      <CardDetailsRow 
        expirationDate={card.expirationDate}
        cvv={card.cvv}
        showCardNumber={showCardNumber}
      />

      {/* Visa Logo */}
      <div className="flex justify-end mt-2">
        <SvgIcon 
          name="Visa Logo" 
          width={48} 
          height={16} 
          className="sm:w-[56px] sm:h-[19px] md:w-[64px] md:h-[22px]" 
        />
      </div>

      {/* Frozen Overlay */}
      <FrozenOverlay isVisible={card.isFrozen} />
    </motion.div>
  )
}

// Main component
export default function CardDisplay({
  cards,
  activeIndex,
  setActiveIndex,
  showCardNumber,
}: CardDisplayProps) {
  if (!cards || cards.length === 0 || activeIndex < 0 || activeIndex >= cards.length) {
    return null
  }

  const card = cards[activeIndex]

  // Drag logic
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50 && activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else if (info.offset.x > 50 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full flex justify-center">
        <div className="relative mb-6 sm:mb-8 flex flex-col items-center w-full">
          <AnimatePresence mode="wait">
            <Card 
              card={card}
              showCardNumber={showCardNumber}
              onDragEnd={handleDragEnd}
            />
          </AnimatePresence>
          
          <CardDots 
            cards={cards}
            activeIndex={activeIndex}
            onCardSelect={setActiveIndex}
          />
        </div>
      </div>
    </div>
  )
}
