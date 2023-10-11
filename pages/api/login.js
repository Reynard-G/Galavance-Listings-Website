import { createConnection } from "mariadb";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password, remember } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  try {
    const rows = await conn.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordValid) {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: remember ? "30d" : "1d" }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
        sameSite: "strict",
        path: "/"
      })
    );

    console.log(`User ${user.username} logged in`);
    return res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await conn.end();
  }
}