"use client";

import React, { useState } from "react";
import {
  useFetchAllUsersQuery,
  useUpdateUserStatusMutation,
} from "../../services/apis/adminApi";

// Define the type for a user object
interface User {
  username: string;
  name: string;
  email: string;
  status: "Active" | "Inactive"; // Assuming status can only be "Active" or "Inactive"
  role: "Admin" | "Seller" | "User"; // Assuming role can only be one of these three values
}

export default function UserManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const { data: users = [], isLoading } = useFetchAllUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (username: string, newStatus: "Active" | "Inactive") => {
    try {
      await updateUserStatus({ username, status: newStatus }).unwrap();
      alert(
        `User ${newStatus === "Active" ? "unblocked" : "blocked"} successfully!`
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  const getStatusTextColor = (status: "Active" | "Inactive") => {
    return status === "Active" ? "text-green-600" : "text-red-600";
  };

  const getDropdownTextColor = (status: "Active" | "Inactive") => {
    return status === "Active" ? "text-green-600" : "text-red-600";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredUsers = users.filter((user: User) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
  {currentUsers.map((user: User, index: number) => (
    <tr key={index} className="text-left">
      <td className="py-2 px-4 border-b">{user.name}</td>
      <td className="py-2 px-4 border-b">{user.email}</td>
      <td
        className={`py-2 px-4 border-b ${getStatusTextColor(
          user.status
        )}`}
      >
        {user.status}
      </td>
      <td className="py-2 px-4 border-b">
        <select
          className={`px-3 py-1 rounded text-black bg-black text-white`}
          value={user.status}
          onChange={(e) =>
            handleStatusChange(user.username, e.target.value as "Active" | "Inactive")
          }
        >
          <option
            value="Active"
            className={getDropdownTextColor("Active")}
          >
            Unblock
          </option>
          <option
            value="Inactive"
            className={getDropdownTextColor("Inactive")}
          >
            Block
          </option>
        </select>
      </td>
      <td className="py-2 px-4 border-b">
        <span
          className={`py-1 px-3 rounded ${
            user.role === "Admin"
              ? "bg-blue-500 text-white"
              : user.role === "Seller"
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          {user.role}
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
