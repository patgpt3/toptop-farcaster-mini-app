import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-toptop-blue" />
    </div>
  )
} 