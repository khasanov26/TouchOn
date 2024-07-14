export const validatePhone = (phone) => {
  const phonePattern = /^[0-9]{10,15}$/; // Adjust pattern based on required phone format
  return phonePattern.test(phone);
}

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const validateName = (name) => {
  return name.trim() !== ''
}