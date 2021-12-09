import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SECRET_KEY } from "./../../../config";

dotenv.config();

class JWTAuth {
  generateToken = async (user: Object) => {
    const token = jwt.sign({ ...user }, SECRET_KEY!);
    return token;
  };

  confirmToken = async () => {
    return "";
  };
}

export default new JWTAuth();
