export function isPasswordSecure(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    switch (true) {
      case password.length < minLength:
        return { secure: false, message: "The password must be at least 8 characters long." };
      case !hasUpperCase:
        return { secure: false, message: "The password must contain at least one uppercase letter." };
      case !hasNumber:
        return { secure: false, message: "The password must contain at least one number." };
      case !hasSpecialChar:
        return { secure: false, message: "The password must contain at least one special character such as [!@#$%]." };
      default:
        return { secure: true, message: "" };
    }
  }