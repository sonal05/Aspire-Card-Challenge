import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Skeleton } from '../ui/Skeleton'

describe('Skeleton Component', () => {
  it('renders with default classes', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('rounded')
    expect(skeleton).toHaveClass('bg-gray-200')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.firstChild
    
    expect(skeleton).toHaveClass('custom-class')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width="w-24" height="h-8" />)
    const skeleton = container.firstChild
    
    expect(skeleton).toHaveClass('w-24')
    expect(skeleton).toHaveClass('h-8')
  })

  it('renders with default width and height when not specified', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    
    expect(skeleton).toHaveClass('w-full')
    expect(skeleton).toHaveClass('h-4')
  })
  
  it('has correct accessibility attributes', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...')
  })
})
