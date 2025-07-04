'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, CreditCard } from 'lucide-react'
import { useState } from 'react'
import { useCreateCard } from '@/hooks/useCards'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createCardSchema = z.object({
  name: z.string()
    .min(2, 'Card name must be at least 2 characters')
    .max(30, 'Card name must be at most 30 characters')
    .regex(/^[A-Za-z\s]+$/, 'Card name can only contain letters and spaces'),
})

type CreateCardForm = z.infer<typeof createCardSchema>

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const createCard = useCreateCard()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateCardForm>({
    resolver: zodResolver(createCardSchema),
  })
  // Watch the card name for live preview
  const watchedName = watch('name', '')

  const onSubmit = async (data: CreateCardForm) => {
    setIsSubmitting(true)
    try {
      await createCard.mutateAsync(data)
      reset()
      onClose()
    } catch (error) {
      console.error('Failed to create card:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      reset()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Card</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Create a new debit card</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Card Preview */}
                  <div className="mx-auto max-w-sm p-4 bg-gradient-to-br from-[#01d167] to-[#00b854] rounded-xl text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm opacity-90">
                        {watchedName.trim() || 'New Debit Card'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm opacity-75">Card Number</div>
                      <div className="font-sans text-base sm:text-lg">**** **** **** ****</div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-75">Valid Thru</div>
                          <div className="font-sans text-xs sm:text-sm">**/**</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-75">Balance</div>
                          <div className="font-semibold text-sm sm:text-base">S$0</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Name Input */}
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="e.g., My Savings Card"
                      {...register('name')}
                      className={`
                        w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base
                        ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'}
                      `}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs sm:text-sm text-red-600"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1 bg-blue-100 rounded-full flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="text-xs sm:text-sm text-blue-700">
                        <p className="font-medium mb-1">Automatic Generation</p>
                        <p>Your card number, expiration date, and CVV will be automatically generated for security.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#4c7dd9] text-white rounded-xl font-medium hover:bg-[#3f6bc7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        Add Card
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
