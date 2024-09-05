export const validateName = (name: string): boolean =>
    /^[A-Za-z\s]{3,}$/.test(name);
  
  export const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  export const validatePassword = (password: string): boolean =>
    /^.{8,}$/.test(password);
  
  export const validateOtp = (otp: string): boolean =>
    /^\d{6}$/.test(otp);
  