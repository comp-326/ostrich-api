import bcrypt from "bcryptjs";

class PasswordHandler {
  /**
   *
   * @param password
   * @param saltLength
   * @returns hashedPassword
   * Generate your password hash easily
   */
  generatepasswordHash = async (
    password: string,
    saltLength: number = 10
  ): Promise<string> => {
    const salt = await bcrypt.genSalt(saltLength);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  /**
   * 
   * @param hashedPassword 
   * @param rawPassword 
   * @returns 
   * Check if passwords match
   */
  confirmPasswordHash = async (
    hashedPassword: string,
    rawPassword: string
  ): Promise<boolean> => {
    const confirmed = await bcrypt.compare(rawPassword, hashedPassword);
    return confirmed;
  };
}

export default new PasswordHandler();
