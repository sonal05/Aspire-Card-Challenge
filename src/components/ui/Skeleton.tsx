interface SkeletonProps {
  className?: string
  height?: string
  width?: string
}

export function Skeleton({ className = '', height = 'h-4', width = 'w-full' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
      aria-label="Loading..."
    />
  )
}

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] flex">
      {/* Sidebar Skeleton */}
      <div className="w-64 lg:w-80 xl:w-[22.5rem] bg-[#0C365A] min-h-screen p-8 hidden md:block sidebar-container">
        <div className="space-y-8">
          {/* Logo */}
          <div className="mb-16">
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
          
          {/* Navigation items */}
          <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-6 w-6 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white min-h-screen overflow-y-auto main-content-with-sidebar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15 py-4 sm:py-6 md:py-8 lg:py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 mt-12 sm:mt-8 md:mt-12 lg:mt-0 gap-4">
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-300 px-3 py-1 rounded h-6 w-12 animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 gap-8">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Main Content Container */}
          <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12" style={{ boxShadow: '0px 2px 12px #00000014' }}>
            <div className="grid grid-cols-1 xl:grid-cols-[10.5fr_9.5fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              
              {/* Left Column - Card Section */}
              <div className="space-y-6">
                {/* Show card number toggle */}
                <div className="flex justify-end">
                  <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>
                
                {/* Green Card */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg relative h-56">
                  <div className="animate-pulse">
                    {/* Top section */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="h-6 w-24 bg-white/20 rounded"></div>
                    </div>
                    
                    {/* Card number */}
                    <div className="mb-6">
                      <div className="h-6 w-48 bg-white/20 rounded"></div>
                    </div>
                    
                    {/* Bottom section */}
                    <div className="flex justify-between items-end">
                      <div className="flex gap-6">
                        <div className="h-4 w-16 bg-white/20 rounded"></div>
                        <div className="h-4 w-12 bg-white/20 rounded"></div>
                      </div>
                      <div className="h-6 w-12 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Card dots */}
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>

                {/* Card Actions */}
                <div className="bg-[#EDF3FF] rounded-2xl py-6 px-4">
                  <div className="flex justify-between gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className="h-8 w-8 rounded bg-gray-300 animate-pulse mb-2"></div>
                        <div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Spacer */}
                <div className="h-6"></div>
                
                {/* Card Details */}
                <div className="border border-[#F5F5F5] rounded-2xl overflow-hidden bg-white">
                  <div className="px-6 py-5 bg-[#F5F9FF]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="border border-[#F5F5F5] rounded-2xl overflow-hidden bg-white">
                  <div className="px-6 py-5 bg-[#F5F9FF]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Transaction items */}
                  <div className="space-y-0">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center px-6 py-6 gap-4 border-b border-gray-100 last:border-b-0">
                        <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                              <div className="h-2 w-2 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-6 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View all transactions button */}
                <div className="border border-[#DDFFEC] bg-[#EDFFF5] rounded-2xl py-5">
                  <div className="h-4 w-40 bg-gray-300 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
