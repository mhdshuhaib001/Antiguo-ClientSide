import React, { useState } from "react";
import {
  useFetchAllUsersQuery,
  useUpdateUserStatusMutation,
} from "../../services/apis/adminApi";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  role: "Admin" | "Seller" | "User";
}

export default function UserManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const { data: users = [], isLoading, isError } = useFetchAllUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading users.</p>;
  }

  const filteredUsers = users.filter((user: User) =>
    Object.values(user).some((value) => {
      const stringValue = value ? String(value) : ''; // Convert to string or default to empty
      return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">USERS</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">PHONE NO</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">ACTION</th>
              <th className="p-3 text-left">ROLE</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user: User) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {user.name[0]}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    defaultValue={user.status.toLowerCase()}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="p-3">
                  {user.role === "Seller" ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {user.role}
                    </span>
                  ) : (
                    user.role
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
