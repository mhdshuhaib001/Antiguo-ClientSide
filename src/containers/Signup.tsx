import React, { useState } from 'react';
import { useSignupMutation, useSendOtpMutation } from '../services/apis/apiSlice';
import { AuthRequest, AuthResponse } from '../types/userTypes/apiTypes';

const SignupForm: React.FC<{ onSignup: (data: AuthResponse) => void }> = ({ onSignup }) => {
  const [signup] = useSignupMutation();
  const [sendOtp] = useSendOtpMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async () => {
    try {
      await sendOtp({ email }).unwrap();
      setIsOtpSent(true);
      alert('OTP sent to your email');
    } catch (err) {
      console.error('Failed to send OTP:', err);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleSignup = async () => {
    const requestData: AuthRequest = {
      name,
      email,
      password,
    };

    try {
      const response = await signup(requestData).unwrap();
      setIsOtpStep(true);
      handleSendOtp();
      onSignup(response);
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (isOtpStep) {
      if (otp === '') {
        setError('Please enter OTP.');
        setIsSubmitting(false);
        return;
      }

      alert('Signup completed successfully with OTP.');
    } else {
      handleSignup();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isOtpStep && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your password"
              required
            />
          </div>
        </>
      )}

      {isOtpStep && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter OTP"
            required
          />
        </div>
      )}

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isOtpStep ? 'Verifying OTP...' : 'Signing Up...') : isOtpStep ? 'Verify OTP' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
