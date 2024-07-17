export function isPasswordSecure(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    switch (true) {
      case password.length < minLength:
        return { secure: false, message: "La contraseña debe tener al menos 8 caracteres." };
      case !hasUpperCase:
        return { secure: false, message: "la contraseña debe contener al menos una mayúscula." };
      case !hasNumber:
        return { secure: false, message: "La contrasela debe contener al menos un número." };
      case !hasSpecialChar:
        return { secure: false, message: "La contrasela debe contener al menos un caracter especial como [!@#$%]" };
      default:
        return { secure: true, message: "" };
    }
  }