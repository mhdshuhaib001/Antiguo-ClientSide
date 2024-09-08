import React, { useState } from "react";
import { useLoginMutation } from "../services/apis/userApi";
import { validateEmail, validatePassword } from "../utils/validationUtils";
import { AuthRequest, AuthResponse } from "../types/userTypes/apiTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";


interface LoginFormProps {
    onLogin: (data: AuthResponse) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email");
            valid = false;
        } else {
            setEmailError(null);
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long");
            valid = false;
        } else {
            setPasswordError(null);
        }

        if (valid) {
            const user: AuthRequest = { email, password };
            try {
                console.log("Submit called with data:", { email, password });

                const result:any = await login(user).unwrap();
                console.log(result,'hallo this is the redult')

                const authToken = result.user.accessToken;
                    localStorage.setItem('authToken', authToken);
                    const userDetails = result.user;
                    console.log(userDetails)
                    dispatch(setUser(userDetails));
                    onLogin(result);
                    navigate('/home');
              

            } catch (error) {
                console.error("Login failed", error);
            }
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
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
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-400' : ''}`}
                    placeholder="Your email"
                />
                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
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
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-400' : ''}`}
                    placeholder="Your password"
                />
                {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            </div>

            <div className="mb-4 text-right">
                <a
                    href="/forgot-password"
                    className="text-black-500 hover:text-blue-700 text-sm"
                >
                    Forgot Password?
                </a>
            </div>

            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                >
                    Sign In
                </button>
            </div>

   
        </form>
    );
};

export default LoginForm;
