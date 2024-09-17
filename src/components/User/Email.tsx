import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailSendMutation } from '../../services/apis/userApi'; 

const Email: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [emailSend, { isLoading, isError }] = useEmailSendMutation();
const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setError('Invalid email address');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && email) {
      try {
        await emailSend({ email }).unwrap(); 
        navigate('/signup')
        setSuccess('Password reset link has been sent to your email.');

        setEmail(''); 
        setError(''); 
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    } else if (!email) {
      setError('Email is required');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4 w-full">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your registered email"
          className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
          aria-describedby="email-error"
        />
        {error && <p id="email-error" className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Email;
