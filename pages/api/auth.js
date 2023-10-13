import { verify } from "jsonwebtoken";

export default function handler(req, res) {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    verify(token, process.env.JWT_SECRET);

    return res.status(200).json({ message: "Authorized" });
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized" });
  }
}