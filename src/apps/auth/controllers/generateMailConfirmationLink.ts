import User from "./../../../models/User.Model";
import { NextFunction, Request, Response } from "express";
import { HOST, PORT, VERSION, SECRET_KEY } from "./../../../config";
import sendMail from "./../../../mail";
import jwt from "jsonwebtoken";
import mailVerificationTemplate from "./../../../mail/mailTemplate";

const generateMailConfirmationLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      const t = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY!);

      sendMail({
        to: email,
        from: "orinda8165felix@gmail.com",
        html: mailVerificationTemplate(
          `${HOST}:${PORT}/${VERSION}/auth/verify/${t}`
        ),
        subject: "Verify account",
      });
      return res.status(200).json({ message: "Mail sent to your inbox" });
    } else {
      return res.status(200).json({ message: "User account does not exist" });
    }
  }

  return res.status(500).json({ message: "Please provide a valid email" });
};

export default generateMailConfirmationLink;
