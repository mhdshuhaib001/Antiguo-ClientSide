import React, { useState } from 'react';

const state = [
  { title: 'Auction Attend', value: 280 },
  { title: 'Auction Win', value: 50 },
  { title: 'Cancel Auction', value: 25 },
];
const biddingSummary = [
  {
    id: '12584885465',
    name: 'Porcelain',
    amount: '$1800',
    status: 'Winning',
    date: 'June 25, 2024',
  },
  {
    id: '12584885482',
    name: 'Old Clocks',
    amount: '$1900',
    status: 'Winning',
    date: 'June 13, 2024',
  },
  {
    id: '12584885536',
    name: 'Manuscripts',
    amount: '$2000',
    status: 'Cancel',
    date: 'June 2, 2024',
  },
  {
    id: '12584885548',
    name: 'Renaissance Art',
    amount: '$2100',
    status: 'Winning',
    date: 'June 8, 2024',
  },
  {
    id: '12584885563',
    name: 'Impressionism Art',
    amount: '$2200',
    status: 'Winning',
    date: 'June 21, 2024',
  },
  {
    id: '12584885589',
    name: 'Romanticism Art',
    amount: '$2300',
    status: 'Cancel',
    date: 'June 9, 2024',
  },
];

const UserDashBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(biddingSummary.length / itemsPerPage);
  return (
    <div className="min-h-screen bg:gray-50 p-4 sm:p-6 lg:p-8">
      {/* motion frame add here first  */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md  overflow-hidden border border-amber-200">
        <div className="p-6 sm:p-8 border-b border-amber-200 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Motion next one is here image area profile */}
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="profile"
              className="w-20 h-20 rounded-full border-full border-2 border-amber-200"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">Hi, Muhammed Shuhaib</h1>
              <p className="text-gray-600">
                You have completed 10 auctions in the last month. Start your auction today!
              </p>
            </div>
          </div>

          <button className="bg-[#975f26] text-white py-1 px-3 rounded-md hover:bg-[#3663f21] focus:outline-none transition duration-300 absolute bottom-4 right-4">
            Edit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className=" m-3 grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 bg-[#f1f1df] border-50 border-b border-amber-200">
        {state.map((state) => (
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-amber-100 hover:border-amber-300 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-amber-600">{state.title}</h2>
            <p className="text-gray-600 font-semibold text-lg">{state.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bidding Summary</h2>
        <div className="overflow-x-auto overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-amber-50">
              <th className="px-4 py-2">Auction ID</th>
              <th className="px-4 py-2">Product name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Auction Date</th>
            </thead>
            <tbody>
              {biddingSummary
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item, _index) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-amber-100 hover:bg-amber-50 transition-colors duration-300"
                  >
                    <td className="px-4 py-2">{item.id}</td>

                    <td className="px-4 py-2 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-2">{item.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === 'Winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-amber-200' : 'bg-white text-gray-600 hover:bg-amber-100'} transition-colors duration-300`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
