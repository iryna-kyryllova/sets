"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SignupState = { error?: string }

export async function signupAction(_prevState: SignupState | null, formData: FormData): Promise<SignupState> {
  const name = formData.get('name') as string | undefined;
  const email = formData.get('email') as string | undefined;
  const password = formData.get('password') as string | undefined;

  if (!email) {
    return { error: "Email is required" }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Email is incorrect" }
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: "Must be at least 8 characters long" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Email is already taken" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })

  redirect("/login")
}