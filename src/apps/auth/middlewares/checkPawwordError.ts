const checkPassswordError = (password: string) => {
    // const PATTERN: RegExp =
    // /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
  let errors: string[] = [];
  if (password.length < 8) {
    errors.push("Your password must be at least 8 characters");
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (errors.length > 0) {
    return {
      error: true,
      errors,
    };
  }
  return {
    error: false,
    errors,
  };
};

export default checkPassswordError