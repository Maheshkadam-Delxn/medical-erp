import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET environment variable not set");
}

// Sign JWT Token
export const signToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.warn("Invalid or expired token:", error.message);
    return null;
  }
};
