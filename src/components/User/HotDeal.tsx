import Image from '../../../public/assets/signup.jpg'
import React from 'react'
interface AuctionItem {
  id: string
  title: string
  description: string
  currentBid: number
  image: string
  daysLeft: number
  hoursLeft: number
  minutesLeft: number
  secondsLeft: number
  isHot?: boolean
}

const auctionItems: AuctionItem[] = [
  {
    id: '1',
    title: 'Velocity visions',
    description: 'where performance meet.',
    currentBid: 2898,
    image: '/placeholder.svg?height=300&width=300',
    daysLeft: 18,
    hoursLeft: 4,
    minutesLeft: 0,
    secondsLeft: 39,
    isHot: true
  },
  {
    id: '2',
    title: 'Where Efficiency',
    description: 'and Velocity Vision Collide.',
    currentBid: 2655,
    image: '/placeholder.svg?height=300&width=300',
    daysLeft: 40,
    hoursLeft: 4,
    minutesLeft: 0,
    secondsLeft: 39
  }
]

export default function AuctionInterface() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Current Auctions</h1>
        <button className="text-blue-600 hover:underline">View All Auction</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {auctionItems.map((item) => (
          <div key={item.id} className={`rounded-lg overflow-hidden ${item.isHot ? "bg-[#8B4513]" : "bg-[#6c8044]"}`}>
            <div className="p-4">
              <div className="relative mb-2">
                {item.isHot && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    HOT NOW
                  </span>
                )}
                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                <p className="text-lg text-white">{item.description}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-200">Current Bid at:</p>
                  <p className="text-3xl font-bold text-white">${item.currentBid.toLocaleString()}</p>
                </div>
                {/* <Image
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="rounded-md"
                /> */}
              </div>
              <div>
                <p className="text-sm text-gray-200 mb-2">Auction Will Be End:</p>
                <div className="flex gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{item.daysLeft}</p>
                    <p className="text-xs text-gray-200">Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{item.hoursLeft}</p>
                    <p className="text-xs text-gray-200">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{item.minutesLeft}</p>
                    <p className="text-xs text-gray-200">Minutes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{item.secondsLeft}</p>
                    <p className="text-xs text-gray-200">Seconds</p>
                  </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}