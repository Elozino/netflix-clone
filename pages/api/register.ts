import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Email, name, and password are required" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email.toString(),
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "", // You may want to handle this field properly
        emailVerified: new Date(), // Assuming you are setting email verification time
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
