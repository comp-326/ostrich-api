import { SECRET_KEY } from "@base/src/config"
import jwt from "jsonwebtoken"
export default function generateToken(userId: string,email:string) {
	const token = jwt.sign({ userId,email }, SECRET_KEY)
	return token
}
