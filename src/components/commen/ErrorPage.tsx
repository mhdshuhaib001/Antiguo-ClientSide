'use client'

import React, { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function ErrorPage({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }
  reset: () => void 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full bg-white border-8 border-double border-amber-900 p-8 shadow-xl transform transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Garamond, serif' }}>Vintage Treasures Auction House</h1>
          <div className="text-sm uppercase tracking-widest text-amber-700">Established 1895</div>
        </header>

        <div className="text-center mb-8">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-700 mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-4">An Unexpected Setback</h2>
          <p className="text-lg text-amber-900 mb-4">
            We regret to inform you that an error has occurred during your perusal of our fine establishment.
          </p>
          <div className="text-sm text-amber-700 mb-2">Error: {error.message}</div>
          <div className="text-xs text-amber-600">Digest: {error.digest}</div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-32 h-1 bg-amber-900"></div>
        </div>

        <div className="text-center space-y-4">
          <button 
            onClick={() => reset()}
            className="px-6 py-2 bg-amber-800 text-white font-semibold uppercase tracking-wider hover:bg-amber-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50"
          >
            Attempt Recovery
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 border-2 border-amber-800 text-amber-800 font-semibold uppercase tracking-wider hover:bg-amber-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50"
          >
            Return to Auction Hall
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-amber-700">
          &copy; {new Date().getFullYear()} Vintage Treasures Auction House. All rights reserved.
        </div>
      </div>
    </div>
  )
}