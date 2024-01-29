
export function validateEmail(email: string) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regexEmail.test(email)
}

export function validateDate(date: Date) {
  return (date.getTime() < new Date().getTime())
}