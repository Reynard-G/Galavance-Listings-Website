import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/"
    })
  );

  console.log(`User ${user.username} logged out`);
  return res.status(200).json({ message: "Logged out" });
}