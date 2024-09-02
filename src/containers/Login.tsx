import React, { useState } from "react";

interface LoginFormProps {
    onLogin: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit called with data:", { email, password });
        onLogin({ email, password });
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
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your email"
                />
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
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your password"
                />
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
