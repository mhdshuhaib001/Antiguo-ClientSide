import { useState } from 'react';
import { validateEmail, validatePassword, validateName } from '../utils/validationUtils'; // Adjust the import path as needed

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    otp?: string;
}

const useFormValidation = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (fields: { name?: string; email?: string; password?: string; otp?: string }) => {
        const newErrors: FormErrors = {};

        if (fields.name && !validateName(fields.name)) {
            newErrors.name = 'Name must be at least 3 characters long and contain only letters.';
        }
        if (fields.email && !validateEmail(fields.email)) {
            newErrors.email = 'Please enter a valid email.';
        }
        if (fields.password && !validatePassword(fields.password)) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        if (fields.otp && !/^\d{6}$/.test(fields.otp)) {
            newErrors.otp = 'OTP must be a 6-digit number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    return { errors, validate };
};

export default useFormValidation;
