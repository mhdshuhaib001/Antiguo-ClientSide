import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFetchCategoriesQuery } from '../../services/apis/userApi'

const categories = [
  { id: 1, name: 'Porcelain', items: 45533, image: '/placeholder.svg?height=120&width=160', icon: '🏺' },
  { id: 2, name: 'Old Clocks', items: 49533, image: '/placeholder.svg?height=120&width=160', icon: '🕰️' },
  { id: 3, name: 'Jewelry', items: 45533, image: '/placeholder.svg?height=120&width=160', icon: '💍' },
  { id: 4, name: 'Manuscripts', items: 44299, image: '/placeholder.svg?height=120&width=160', icon: '📜' },
  { id: 5, name: 'Ceramics', items: 42102, image: '/placeholder.svg?height=120&width=160', icon: '🍶' },
]

export default function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { data: categories, isLoading } = useFetchCategoriesQuery()
  console.log(categories,'categories==========================')
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#f5f3e6] p-4 font-serif">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-800">Category.</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth"
        >
          {categories?.map((category) => (
          <div key={category.id} className="flex-none w-40 bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
          <img src={category.imageUrl} alt={category.name} className="w-full h-34 object-cover" />
          <div className="p-3">
            <div className="w-8 h-8 bg-[#f5f3e6] rounded-full flex items-center justify-center mb-2">
              <img src={category.iconUrl} alt={`${category.name} icon`} className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-800 mb-1">{category.name}</h3>
            {/* <p className="text-xs text-gray-600">{category.items.toLocaleString()} Item</p> */}
          </div>
        </div>
        
          ))}
        </div>
      </div>
    </div>
  )
}