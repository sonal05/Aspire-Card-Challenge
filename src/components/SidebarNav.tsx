import { SvgIcon } from './SvgIcon'

interface SidebarNavProps {
  activeTab: string
}

const navItems = [
  { id: 'home', iconName: 'Home', label: 'Home' },
  { id: 'my-debit-cards', iconName: 'Card', label: 'Cards' },
  { id: 'payments', iconName: 'Payments', label: 'Payments' },
  { id: 'credit', iconName: 'Credit', label: 'Credit' },
  { id: 'settings', iconName: 'user', label: 'Settings' },
] as const

export default function SidebarNav({ activeTab }: SidebarNavProps) {
  return (
    <nav className="space-y-8 sm:space-y-10 md:space-y-12 w-full" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={activeTab === item.id}
          aria-label={`Navigate to ${item.label}`}
          className={`flex items-center h-10 sm:h-12 gap-3 sm:gap-4 px-0 rounded-lg cursor-pointer w-full text-lg sm:text-xl font-medium transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
            activeTab === item.id
              ? 'text-[#01d167]'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <SvgIcon 
            name={item.iconName} 
            width={24} 
            height={24} 
            className="text-white sm:w-7 sm:h-7" 
          />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
