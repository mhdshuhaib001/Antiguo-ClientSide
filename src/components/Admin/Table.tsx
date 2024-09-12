import React from 'react';
import {
  useFetchAllUsersQuery,
  useUpdateUserStatusMutation,
} from '../../services/apis/adminApi';

const AdminUserTable: React.FC = () => {
  const { data: users = [], isLoading } = useFetchAllUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (
    username: string,
    newStatus: 'Active' | 'Inactive'
  ) => {
    try {
      await updateUserStatus({ username, status: newStatus }).unwrap();
      alert(
        `User ${newStatus === 'Active' ? 'unblocked' : 'blocked'} successfully!`
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };

  const getStatusTextColor = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'text-green-600' : 'text-red-600';
  };

  const getDropdownTextColor = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'text-green-600' : 'text-red-600';
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            {/* <th className="py-2 px-4 border-b">Status</th> */}
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {(users as any[]).map((user: any, index: number) => (
            <tr key={index} className="text-left">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td
                className={`py-2 px-4 border-b ${getStatusTextColor(user.status)}`}
              >
                {user.status}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  className={`px-3 py-1 rounded text-black bg-black text-white`}
                  value={user.status}
                  onChange={(e) =>
                    handleStatusChange(
                      user.username,
                      e.target.value as 'Active' | 'Inactive'
                    )
                  }
                >
                  <option
                    value="Active"
                    className={getDropdownTextColor('Active')}
                  >
                    Unblock
                  </option>
                  <option
                    value="Inactive"
                    className={getDropdownTextColor('Inactive')}
                  >
                    Block
                  </option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`py-1 px-3 rounded ${
                    user.role === 'Admin'
                      ? 'bg-blue-500 text-white'
                      : user.role === 'Seller'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                  }
                  `}
                >
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
