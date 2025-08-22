import { cn } from '@/lib/utils'

export default function Button({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-black text-white hover:opacity-90',
    outline: 'border',
    ghost: 'hover:bg-gray-100',
  }

  return (
    <button
      className={cn('inline-flex items-center justify-center rounded px-4 py-2 text-sm', variants[variant], className)}
      {...props}
    />
  )
}

