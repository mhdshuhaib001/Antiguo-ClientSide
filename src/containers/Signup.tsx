import React, { useState, useEffect } from 'react';
import { useSignupMutation, useSendOtpMutation } from '../services/apis/apiSlice';
import { AuthResponse } from '../types/userTypes/apiTypes';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateName, validatePassword } from '../utils/validationUtils';

const SignupForm: React.FC<{ onSignup: (data: AuthResponse) => void }> = ({ onSignup }) => {
  const [signup] = useSignupMutation();
  const [sendOtp] = useSendOtpMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpExpired, setOtpExpired] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    if (isOtpStep && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft === 0) {
        setOtpExpired(true);
        setOtpError('OTP has expired. Please request a new OTP.');
      }

      return () => clearInterval(timer);
    }
  }, [isOtpStep, timeLeft]);

  const handleSendOtp = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await sendOtp({ email, otp: 0 }).unwrap();
      setIsOtpStep(true);
      setTimeLeft(60);
      setOtpError(null);
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (isOtpStep) {
      if (otpExpired) {
        setOtpError('OTP has expired. Please request a new OTP.');
        setIsSubmitting(false);
        return;
      }

      if (!otp) {
        setOtpError('Please enter the OTP.');
        setIsSubmitting(false);
        return;
      }

      try {
        const result = await signup({ name, email, password, otp }).unwrap();
        onSignup(result as AuthResponse);
        alert('Signup completed successfully.');
        navigate('/user/home');
      } catch (err) {
        console.error('Signup failed:', err);
        setError('Signup failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      let hasError = false;

      if (!validateName(name)) {
        setNameError('Name must be at least 3 characters long and contain only letters.');
        hasError = true;
      } else {
        setNameError(null);
      }

      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email.');
        hasError = true;
      } else {
        setEmailError(null);
      }

      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 8 characters long.');
        hasError = true;
      } else {
        setPasswordError(null);
      }

      if (hasError) {
        setIsSubmitting(false);
        return;
      }

      await handleSendOtp();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isOtpStep ? (
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
              onChange={(e) => {
                setName(e.target.value);
                setNameError(null); 
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                nameError ? 'border-red-500' : ''
              }`}
              placeholder="Your name"
            />
            {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? 'border-red-500' : ''
              }`}
              placeholder="Your email"
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null); 
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? 'border-red-500' : ''
              }`}
              placeholder="Your password"
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError(null);
              }}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                otpError ? 'border-red-500' : ''
              }`}
              placeholder="Enter OTP"
            />
            {otpError && <p className="text-red-500 text-xs italic">{otpError}</p>}
          </div>
          <div className="mb-4 text-blue-600">
            {timeLeft > 0 ? `OTP expires in 00:${String(timeLeft).padStart(2, '0')}` : 'OTP expired'}
          </div>
        </>
      )}

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isOtpStep ? 'Submitting OTP...' : 'Signing Up...') : isOtpStep ? 'Submit OTP' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;


















