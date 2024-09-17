import React, { useState } from "react";
import { useForgetPasswordMutation } from "../../services/apis/userApi";
import { useLocation } from "react-router-dom";

const ForgetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      setError("Token is missing.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      console.log('Token:', token);

    const result = await forgetPassword({ token, newPassword });
console.log(result,'hakooooooooooooooooooooo')
      setSuccess("Password reset successfully.");
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form className="w-full max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <div className="flex justify-center">
        <button
          type="submit"
          className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ForgetPassword;
