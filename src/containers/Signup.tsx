import React, { useState, useEffect } from 'react';
import { useSignupMutation, useSendOtpMutation } from '../services/apis/userApi';
import { AuthResponse, User } from '../types/userTypes/apiTypes';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateName, validatePassword } from '../utils/validationUtils';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface SignupFormProps {
  onSignup: (data: AuthResponse) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [signup] = useSignupMutation();
  const [sendOtp] = useSendOtpMutation();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpExpired, setOtpExpired] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(false);

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
        setCanResendOtp(true); 
        toast.error('OTP has expired. Please request a new OTP.'); 
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
      setCanResendOtp(false); 
    } catch (err: any) {
      console.log(err, 'heyyyyyyyy');
      if (err.status === 400) {
        if (err.data === "Email already exists") {
          console.error('Email already exists:', err);
          setError('Email already exists. Please use a different email.');
        } else {
          console.error('Failed to send OTP:', err);
          setError('Failed to send OTP. Please try again.');
        }
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
    
  };

  const handleResendOtp = () => {
    setOtpExpired(false);
    setTimeLeft(60);
    setCanResendOtp(false);
    handleSendOtp();
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
        const result = await signup({name, email, password, otp }).unwrap();
        console.log('Signup result:', result.token);
        // console.log(user)
        
        onSignup(result as AuthResponse);
        toast.success('Signup completed successfully.'); 
        navigate('/home');
      } catch (err: any) {
        console.error('Signup failed:', err);
        if (err.data && err.data.message) {
          if (err.data.message.includes('OTP')) {
            setOtpError('The OTP you entered is incorrect.');
          } else {
            toast.error(err.data.message);
          }
        } else {
          toast.error('Signup failed. Please try again.');
        }
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
          {isOtpStep && (
            <div className="mb-4 text-center text-gray-600-600">
              OTP has been sent to your email. Please check your inbox.
            </div>
          )}

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

          {otpExpired && canResendOtp && (
            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Resending OTP...' : 'Resend OTP'}
            </button>
          )}
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
function dispatch(arg0: { payload: { _id: string; name: string; email: string; }; type: "user/setUser"; }) {
  throw new Error('Function not implemented.');
}

