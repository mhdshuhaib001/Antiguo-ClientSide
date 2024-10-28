
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Heart, Search, Filter, X } from 'lucide-react'

interface AuctionItem {
  id: number
  title: string
  image: string
  currentBid: number
  daysLeft: number
  hoursLeft: number
  minutesLeft: number
  secondsLeft: number
  status: 'live' | 'upcoming' | 'sold'
  featured: boolean
  category: string
}

const auctionItems: AuctionItem[] = [
  {
    id: 1,
    title: "Vintage Grandfather Clock",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 2898,
    daysLeft: 77,
    hoursLeft: 6,
    minutesLeft: 12,
    secondsLeft: 58,
    status: 'live',
    featured: true,
    category: "Furniture"
  },
  {
    id: 2,
    title: "19th Century Chinese Porcelain Vase",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 4648,
    daysLeft: 77,
    hoursLeft: 6,
    minutesLeft: 12,
    secondsLeft: 58,
    status: 'live',
    featured: true,
    category: "Ceramics"
  },
  {
    id: 3,
    title: "Art Deco Bronze Sculpture",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 8974,
    daysLeft: 77,
    hoursLeft: 6,
    minutesLeft: 12,
    secondsLeft: 58,
    status: 'upcoming',
    featured: false,
    category: "Sculptures"
  },
  {
    id: 4,
    title: "Antique Marble Bust",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 5237,
    daysLeft: 77,
    hoursLeft: 6,
    minutesLeft: 12,
    secondsLeft: 58,
    status: 'live',
    featured: false,
    category: "Sculptures"
  },
  {
    id: 5,
    title: "Victorian Era Oil Painting",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 3500,
    daysLeft: 65,
    hoursLeft: 12,
    minutesLeft: 30,
    secondsLeft: 0,
    status: 'live',
    featured: true,
    category: "Paintings"
  },
  {
    id: 6,
    title: "Antique Brass Telescope",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 1200,
    daysLeft: 82,
    hoursLeft: 3,
    minutesLeft: 45,
    secondsLeft: 30,
    status: 'upcoming',
    featured: false,
    category: "Scientific Instruments"
  },
  {
    id: 7,
    title: "Vintage Leather Bound Books Set",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 750,
    daysLeft: 70,
    hoursLeft: 8,
    minutesLeft: 20,
    secondsLeft: 15,
    status: 'live',
    featured: false,
    category: "Books"
  },
  {
    id: 8,
    title: "Art Nouveau Silver Tea Set",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 6800,
    daysLeft: 88,
    hoursLeft: 1,
    minutesLeft: 55,
    secondsLeft: 40,
    status: 'live',
    featured: true,
    category: "Silverware"
  }
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState(auctionItems)
  const [showFilters, setShowFilters] = useState(false)

  const categories = Array.from(new Set(auctionItems.map(item => item.category)))

  useEffect(() => {
    const filtered = auctionItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.currentBid >= priceRange[0] &&
      item.currentBid <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(item.category))
    )
    setFilteredItems(filtered)
  }, [searchTerm, priceRange, selectedCategories])

  const featuredItems = filteredItems.filter(item => item.featured)

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#F3E5D8] to-[#E6D0BA] font-serif">
      <motion.h1 
        className="text-4xl font-bold text-[#4A3728] mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Antique Treasures Auction
      </motion.h1>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-[#8C7A6B]" />
          <motion.input
            type="text"
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#C4A484] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7A6B] bg-[#FFF8F0] text-[#4A3728] placeholder-[#8C7A6B]"
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </div>
  
    </div>
  )
}

function AuctionItemCard({ item }: { item: AuctionItem }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="bg-[#FFF8F0] rounded-lg shadow-md overflow-hidden border-2 border-[#C4A484] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#4A3728] to-transparent opacity-0"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {item.status === 'live' && (
          <motion.span 
            className="absolute top-2 left-2 bg-[#D2691E] text-[#FFF8F0] text-xs font-bold px-2 py-1 rounded-full"
            
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Live
          </motion.span>
        )}
        {item.status === 'upcoming' && (
          <motion.span 
            className="absolute top-2 left-2 bg-[#8C7A6B] text-[#FFF8F0] text-xs font-bold px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upcoming
          </motion.span>
        )}
        <motion.button 
          className="absolute top-2 right-2 text-[#FFF8F0] hover:text-[#D2691E] transition-colors"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="h-6 w-6" />
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#4A3728] mb-2">{item.title}</h3>
        <p className="text-[#6B5744] text-sm mb-2">Current Bid: ${item.currentBid.toLocaleString()}</p>
        <div className="flex items-center justify-between text-sm text-[#8C7A6B]">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{item.daysLeft}d</span>
          </div>
          <span>{item.hoursLeft}h</span>
          <span>{item.minutesLeft}m</span>
          <span>{item.secondsLeft}s</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        {item.status === 'live' && (
          <motion.button 
            className="w-full bg-[#8C7A6B] text-[#FFF8F0] py-2 rounded-full hover:bg-[#6B5744] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bid Now
          </motion.button>
        )}
        {item.status === 'upcoming' && (
          <button className="w-full bg-[#E6D0BA] text-[#4A3728] py-2 rounded-full cursor-not-allowed">
            Notify Me
          </button>
        )}
      </div>
    </motion.div>
  )
}