import { SvgIcon } from './SvgIcon'

interface BottomNavProps {
  onTabChange?: (tabId: string) => void
}

const navItems = [
  { id: 'home', iconName: 'home-mobile', label: 'Home' },
  { id: 'my-debit-cards', iconName: 'Card', label: 'Cards' },
  { id: 'payments', iconName: 'Payments', label: 'Payments' },
  { id: 'credit', iconName: 'Credit', label: 'Credit' },
  { id: 'settings', iconName: 'user-mobile', label: 'Profile' },
] as const

export default function BottomNav({ onTabChange }: BottomNavProps) {
  // Always select 'my-debit-cards' as active
  const selectedTab = 'my-debit-cards'
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 md:hidden shadow-[0_-4px_8px_rgba(0,0,0,0.05)]"
      role="navigation" 
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => {
          const isActive = item.id === selectedTab
          return (
            <button
              key={item.id}
              onClick={isActive ? () => onTabChange?.(item.id) : undefined}
              role="tab"
              aria-selected={isActive}
              aria-label={`Navigate to ${item.label}`}
              className={`flex flex-col items-center justify-center h-full transition-colors focus:outline-none ${!isActive ? 'pointer-events-none opacity-60' : ''}`}
              disabled={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              <SvgIcon 
                name={item.iconName} 
                width={24} 
                height={24} 
                className={isActive ? 'text-[#01d167]' : 'text-[#DDDDDD]'}
              />
              <span className={`text-xs mt-1 ${isActive ? 'text-[#01d167]' : 'text-[#DDDDDD]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  )
}
