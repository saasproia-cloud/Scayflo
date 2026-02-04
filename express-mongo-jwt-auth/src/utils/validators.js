export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
};

export const validateUserInput = (userInput) => {
    const { email, password } = userInput;
    const errors = {};

    if (!validateEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!validatePassword(password)) {
        errors.password = 'Password must be at least 6 characters long and include uppercase, lowercase, numbers, and special characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};