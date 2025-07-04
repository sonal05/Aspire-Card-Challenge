import { motion } from 'framer-motion'
import { SvgIcon } from './SvgIcon'

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

interface RecentTransactionsProps {
  transactions: Transaction[]
  isTransactionsExpanded: boolean
  setIsTransactionsExpanded: (v: boolean) => void
}

// Sub-component for collapsible header
interface CollapsibleHeaderProps {
  title: string
  iconName: string
  isExpanded: boolean
  onToggle: () => void
}

function CollapsibleHeader({ title, iconName, isExpanded, onToggle }: CollapsibleHeaderProps) {
  return (
    <div
      className="px-4 sm:px-6 py-4 sm:py-5 bg-[#F5F9FF] border-[#F5F5F5]"
      style={{ boxShadow: '0px 0px 8px #00000014' }}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <SvgIcon name={iconName} width={20} height={20} className="sm:w-6 sm:h-6" />
          <span className="text-[#0C365A] font-regular text-base sm:text-lg">{title}</span>
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-600 cursor-pointer">
          <SvgIcon
            name="down-arrow"
            width={16}
            height={16}
            className={`sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
    </div>
  )
}

// Sub-component for transaction item
interface TransactionItemProps {
  transaction: Transaction
  isLast: boolean
}

function TransactionItem({ transaction, isLast }: TransactionItemProps) {
  const isPositiveAmount = transaction.amount > 0
  const formattedAmount = `${isPositiveAmount ? '+' : '-'} S$ ${Math.abs(transaction.amount)}`
  
  return (
    <div
      className={`flex items-center px-4 sm:px-6 py-4 sm:py-6 gap-3 sm:gap-4 ${
        isLast ? 'rounded-b-xl sm:rounded-b-2xl' : 'border-b border-gray-100'
      }`}
    >
      {/* Transaction Icon */}
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: transaction.iconColor }}
      >
        <SvgIcon 
          name={transaction.iconName} 
          width={14} 
          height={14} 
          className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" 
        />
      </div>
      
      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        {/* Merchant and Amount */}
        <div className="flex items-center justify-between mb-1">
          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate mr-2">
            {transaction.merchant}
          </div>
          <div className={`font-semibold text-sm sm:text-base flex-shrink-0 text-right flex items-center justify-end gap-2 sm:gap-3 ${
            isPositiveAmount ? 'text-green-500' : 'text-gray-900'
          }`}>
            {formattedAmount}
            <SvgIcon name="next" width={6} height={6} className="sm:w-2 sm:h-2" />
          </div>
        </div>
        
        {/* Date and Description */}
        <div className="flex flex-col items-start gap-1.5 sm:gap-2.5">
          <span className="text-xs text-gray-400">{transaction.date}</span>
          <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold" style={{ color: '#325BAF' }}>
            <span
              className="inline-flex items-center justify-center flex-shrink-0"
              style={{
                background: '#325BAF',
                width: '24px',
                height: '20px',
                borderRadius: '999px'
              }}
            >
              <SvgIcon name="business-and-finance" width={10} height={10} className="text-white sm:w-3 sm:h-3" />
            </span>
            <span className="truncate">{transaction.description}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// Main component
export default function RecentTransactions({
  transactions,
  isTransactionsExpanded,
  setIsTransactionsExpanded,
}: RecentTransactionsProps) {
  return (
    <div className="border border-[#F5F5F5] rounded-xl sm:rounded-2xl overflow-hidden bg-white relative z-10">
      <CollapsibleHeader
        title="Recent transactions"
        iconName="Group 11889-1"
        isExpanded={isTransactionsExpanded}
        onToggle={() => setIsTransactionsExpanded(!isTransactionsExpanded)}
      />
      
      <motion.div
        initial={false}
        animate={{ height: isTransactionsExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {isTransactionsExpanded && (
          <div className="overflow-y-auto" style={{ height: '448px' }}>
            {transactions.map((transaction, idx) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                isLast={idx === transactions.length - 1}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
