'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AddCardModal } from '@/components/AddCardModal'
import { SvgIcon } from '@/components/SvgIcon'
import { LoadingSkeleton } from '@/components/ui/Skeleton'
import { useCards, useToggleCardFreeze } from '@/hooks/useCards'
import SidebarNav from '@/components/SidebarNav'
import BottomNav from '@/components/BottomNav'
import CardDisplay from '@/components/CardDisplay'
import CardActions from '@/components/CardActions'
import RecentTransactions from '@/components/RecentTransactions'
import CardDetails from '@/components/CardDetails'
import { defaultCard, mockTransactions } from '@/lib/data'
import { TEXT } from '@/lib/constants'

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('my-debit-cards')
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCardDetailsExpanded, setIsCardDetailsExpanded] = useState(false)
  const [isTransactionsExpanded, setIsTransactionsExpanded] = useState(true)
  const { data: cards = [], isLoading, error } = useCards()
  const toggleFreeze = useToggleCardFreeze()

  const cardsToDisplay = cards.length > 0 ? cards : [defaultCard]
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const currentCard = cardsToDisplay[activeCardIndex]

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load cards</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const totalBalance = 3000

  const handleFreezeCard = () => {
    if (cards.length > 0) {
      const cardToToggle = cards.find(card => card.id === currentCard.id)
      if (cardToToggle) {
        toggleFreeze.mutate({ id: cardToToggle.id, isFrozen: !cardToToggle.isFrozen })
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans">
      {/* Mobile Menu Button - Hidden since we're using bottom navigation */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 hidden p-2 bg-[#0C365A] text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex">
        {/* Desktop Sidebar - hidden on mobile */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 bg-[#0C365A] text-white transform transition-transform duration-300 ease-in-out
            hidden
            md:block md:static md:translate-x-0 md:w-64 lg:w-80 xl:w-[22.5rem]
            sidebar-full-height sidebar-container overflow-y-auto hide-scrollbar
          `}
        >
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-start w-full min-h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5 w-full">
              <SvgIcon name="Aspire Logo" width={100} className="sm:w-[120px] md:w-[130px] lg:w-[140px]" />
            </div>
            {/* Tagline */}
            <p className="text-white opacity-30 text-sm sm:text-base mb-8 sm:mb-10 md:mb-16 lg:mb-20 leading-relaxed w-full">
              {TEXT.TAGLINE}
            </p>
            {/* Sidebar Navigation */}
            <SidebarNav activeTab={activeTab} />
          </div>
        </div>

        {/* Mobile Backdrop - removed since we're using bottom nav */}

        {/* Main Content */}
        <div className="flex-1 min-h-screen overflow-y-auto main-content-with-sidebar pb-28 md:pb-0 md:bg-white bg-[#0C365A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15 py-0 sm:py-6 md:py-8 lg:py-10 mb-8 md:mb-0">
          {/* Header - Blue background for mobile only */}
          <div className="md:bg-transparent bg-[#0C365A] -mx-4 px-4 py-6 md:p-0 md:m-0 rounded-b-xl">
            {/* Mobile Logo - Only visible on mobile, positioned at top right */}
            <div className="flex justify-end md:hidden">
                <SvgIcon name="mobileLogo" width={26} height={26} className="text-white" />
            </div>
            
            {/* Account Title and Balance */}
            <div className="mb-6 md:mb-8 mt-0 sm:mt-8 md:mt-12 lg:mt-0">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm sm:text-base text-white md:text-[#222222] mb-1 sm:mb-2">{TEXT.AVAILABLE_BALANCE}</div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-[#01d167] text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                      {TEXT.CURRENCY}
                    </div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-white md:text-gray-900">
                      {totalBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {/* New Card Button - Responsive for both mobile and desktop */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center gap-2 md:bg-[#325BAF] bg-transparent text-white sm:pb-0 px-3 md:px-6 py-1.5 md:py-3 rounded-md md:rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base h-fit whitespace-nowrap"
                >
                  <div className="flex items-center justify-center rounded-full w-5 h-5 bg-[#23CEFD] text-white md:hidden">
                    <span className="text-xs text-black font-bold">+</span>
                  </div>
                  <SvgIcon name="box" width={18} height={18} className="text-white hidden md:block" />
                    <span className="text-[#23CEFD] font-bold text-base md:text-sm md:text-white">{TEXT.NEW_CARD}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-0 md:mb-6 overflow-x-auto mt-2">
            <button
              onClick={() => setActiveTab('my-debit-cards')}
              className={`pb-2 px-1 mr-6 sm:mr-8 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'my-debit-cards'
                  ? 'border-white md:border-[#23CEFD] text-white md:text-[#222222] font-semibold'
                  : 'border-transparent text-white/70 md:text-[#222222]/30 hover:text-white md:hover:text-[#222222]/50'
              }`}
            >
              {TEXT.MY_DEBIT_CARDS}
            </button>
            <button
              onClick={() => setActiveTab('all-company-cards')}
              className={`pb-2 px-1 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'all-company-cards'
                  ? 'border-white md:border-[#23CEFD] text-white md:text-[#222222] font-semibold'
                  : 'border-transparent text-white/70 md:text-[#222222]/30 hover:text-white md:hover:text-[#222222]/50'
              }`}
            >
              {TEXT.ALL_COMPANY_CARDS}
            </button>
          </div>

          {/* Main Content Container */}
          <div className="bg-[#0C365A] md:bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 md:mt-4 mt-0" style={{ boxShadow: '0px 2px 12px #00000014' }}>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[10.5fr_9.5fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {/* Card Section */}
              <div className="order-1">
                {/* Show Card Number Toggle */}
                <div className="flex justify-end mb-3 sm:mb-4">
                  <button
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="flex items-center gap-2 text-white md:text-[#01d167] text-xs sm:text-sm font-medium hover:text-white/90 md:hover:text-[#00b854] transition-colors z-10 relative"
                  >
                    <SvgIcon name="remove_red_eye-24px" width={14} height={14} className="sm:w-4 sm:h-4" />
                    {showCardNumber ? 'Hide card number' : TEXT.SHOW_CARD_NUMBER}
                  </button>
                </div>
                {/* Card Display */}
                <CardDisplay
                  cards={cardsToDisplay}
                  activeIndex={activeCardIndex}
                  setActiveIndex={setActiveCardIndex}
                  showCardNumber={showCardNumber}
                />
                {/* Card Actions */}
                <CardActions
                  currentCard={currentCard}
                  handleFreezeCard={handleFreezeCard}
                />
              </div>
              {/* Right Sidebar */}
              <div className="order-2">
                {/* Spacer to align with "Show card number" button */}
                <div className="mb-2 sm:mb-[1.7rem]" style={{ height: '0.5rem' }}></div>
                
                <div className="space-y-3 sm:space-y-8">
                  {/* Card Details */}
                  <CardDetails
                    currentCard={currentCard}
                    showCardNumber={showCardNumber}
                    isCardDetailsExpanded={isCardDetailsExpanded}
                    setIsCardDetailsExpanded={setIsCardDetailsExpanded}
                  />
                  {/* Recent Transactions */}
                  <RecentTransactions
                    transactions={mockTransactions}
                    isTransactionsExpanded={isTransactionsExpanded}
                    setIsTransactionsExpanded={setIsTransactionsExpanded}
                  />
                </div>
                {/* Footer - View All Button */}
                {isTransactionsExpanded && (
                  <div className="border-t border-gray-100 z-0">
                    <button
                      className="w-full border border-[#DDFFEC] text-[#01d167] bg-[#EDFFF5] rounded-2xl py-4 sm:py-5 -mt-4 sm:-mt-6 pt-8 sm:pt-10 font-medium transition-colors text-sm sm:text-base cursor-pointer"
                    >
                      {TEXT.VIEW_ALL_TRANSACTIONS}
                    </button>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Card Modal */}
        <AddCardModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
        
        {/* Mobile Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tabId) => setActiveTab(tabId)} 
        />
      </div>
    </div>
  )
}
