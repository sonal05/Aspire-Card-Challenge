import { motion } from 'framer-motion'
import { SvgIcon } from './SvgIcon'
import type { Card } from '@/types/card'

interface CardDetailsProps {
  currentCard: Card
  showCardNumber: boolean
  isCardDetailsExpanded: boolean
  setIsCardDetailsExpanded: (v: boolean) => void
}

export default function CardDetails({
  currentCard,
  showCardNumber,
  isCardDetailsExpanded,
  setIsCardDetailsExpanded,
}: CardDetailsProps) {
  return (
    <div className="border border-[#F5F5F5] rounded-xl sm:rounded-2xl overflow-hidden bg-white relative z-10">
      <div
        className="px-4 sm:px-6 py-4 sm:py-5 bg-[#F5F9FF] border-[#F5F5F5]"
        style={{ boxShadow: '0px 0px 8px #00000014' }}
      >
        <button
          onClick={() => setIsCardDetailsExpanded(!isCardDetailsExpanded)}
          className="flex items-center justify-between w-full group"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <SvgIcon name="Group 11889" width={20} height={20} className="sm:w-6 sm:h-6" />
            <span className="text-[#0C365A] font-regular text-base sm:text-lg">Card details</span>
          </div>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-600 cursor-pointer`}>
            <SvgIcon
              name="down-arrow"
              width={16}
              height={16}
              className={`sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${isCardDetailsExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: isCardDetailsExpanded ? 1 : 0, height: isCardDetailsExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`overflow-hidden bg-white ${isCardDetailsExpanded ? 'px-4 sm:px-6 pb-4 sm:pb-6' : ''}`}
        style={{ display: isCardDetailsExpanded ? 'block' : 'none' }}
      >
        {isCardDetailsExpanded && (
          <div className="pt-4 sm:pt-5 space-y-3 sm:space-y-4">
            {[
              { label: 'Name on card', value: currentCard.name },
              {
                label: 'Card number',
                value: showCardNumber
                  ? currentCard.cardNumber.replace(/(.{4})/g, '$1 ').trim()
                  : `•••• •••• •••• ${currentCard.cardNumber.slice(-4)}`,
                className: 'font-sans text-xs sm:text-sm'
              },
              { label: 'Thru', value: currentCard.expirationDate },
              { label: 'CVV', value: showCardNumber ? currentCard.cvv : '***' },
            ].map(({ label, value, className }) => (
              <div key={label} className="flex justify-between items-center py-2">
                <span className="text-gray-500 text-xs sm:text-sm">{label}</span>
                <span className={`text-gray-900 font-medium text-xs sm:text-sm ${className || ''}`}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
