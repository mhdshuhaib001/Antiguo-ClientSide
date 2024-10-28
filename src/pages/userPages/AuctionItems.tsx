import React, { useState, useEffect } from 'react'
import { Filter, Search } from 'lucide-react'
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'
import AuctionItem from '../../components/User/AuctionItemComponent'

const auctionItems = [
  {
    id: 1,
    name: "Vintage Grandfather Clock",
    imageUrl: "/placeholder.svg?height=200&width=300",
    currentBid: 2898,
    auctionEndTime: "2024-12-30T12:00:00Z",
    status: 'auction',
    featured: true
  },
  {
    id: 2,
    name: "19th Century Chinese Porcelain Vase",
    imageUrl: "/placeholder.svg?height=200&width=300",
    currentBid: 4648,
    auctionEndTime: "2024-12-30T12:00:00Z",
    status: 'auction',
    featured: true
  },
  {
    id: 3,
    name: "Art Deco Bronze Sculpture",
    imageUrl: "/placeholder.svg?height=200&width=300",
    currentBid: 8974,
    auctionEndTime: "2024-12-31T14:00:00Z",
    status: 'upcoming',
    featured: false
  }
];

export default function AuctionGrid() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [filteredItems, setFilteredItems] = useState(auctionItems)

  useEffect(() => {
    const filtered = auctionItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.currentBid >= minPrice &&
      item.currentBid <= maxPrice
    )
    setFilteredItems(filtered)
  }, [searchTerm, minPrice, maxPrice])

  const featuredItems = filteredItems.filter(item => item.featured)

  return (
    <div className="container mx-auto px-4 py-8 bg-sepia-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <p className="text-sm text-sepia-700 mb-4 md:mb-0">Showing {filteredItems.length} Of {auctionItems.length} Results</p>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search auctions..."
              className="pl-10 pr-4 py-2 border border-sepia-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sepia-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-sepia-400" size={18} />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-sepia-200 text-sepia-800 rounded-md border border-sepia-300 hover:bg-sepia-300 transition-colors"
          >
            <Filter className="mr-2" size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-sepia-50 rounded-lg shadow-md border border-sepia-200">
          <h2 className="text-lg font-semibold text-sepia-800 mb-4">Price Range</h2>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              className="w-1/2 px-3 py-2 border border-sepia-300 rounded-md"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-1/2 px-3 py-2 border border-sepia-300 rounded-md"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sepia-800 mb-4">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <AuctionItem
                key={item.id}
                product={{ 
                  id: item.id.toString(),
                  name: item.name,
                  imageUrl: item.imageUrl,
                  currentBid: item.currentBid
                }}
                auctionEndTime={item.auctionEndTime}
                status={item.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Auction Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <AuctionItem
            key={item.id}
            product={{ 
              id: item.id.toString(),
              name: item.name,
              imageUrl: item.imageUrl,
              currentBid: item.currentBid
            }}
            auctionEndTime={item.auctionEndTime}
            status={item.status}
          />
        ))}
      </div>
    </div>
  )
}


