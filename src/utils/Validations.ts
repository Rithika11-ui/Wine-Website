
export const validationPassword = (value : any) => {
    const errors = [];
    if (value.length < 8) errors.push("At least 8 characters");
    if (value.length > 100) errors.push("Max 100 characters.")
    if (!/[A-Z]/.test(value)) errors.push("At least one uppercase letter.")
    if (!/[a-z]/.test(value)) errors.push("At least one lowercase letter.")
    if (!/[0-9]/.test(value)) errors.push("At least one number.")
    if (!/[@*$!]/.test(value)) errors.push("At least one special character letter.")
    return errors;
}

export const validateEmail = (value :any) => {
    const valid = /^[a-z0-9._%+-]+@(gmail|yahoo)\.com$/.test(value);
    return valid ? "" : "Must be a Gmail or Yahoo email";
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password !== confirmPassword ? "Passwords do not match" : "";
};