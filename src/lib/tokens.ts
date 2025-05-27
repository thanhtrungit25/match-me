import { TokenType } from "@prisma/client";
import { prisma } from "./prisma";

export async function getTokenByEmail(email: string) {
  try {
    return prisma.token.findFirst({
      where: { email }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenByToken(token: string) {
  try {
    return prisma.token.findFirst({
      where: { token }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateToken(email: string, type: TokenType) {
  const token = getToken();
  // expires in 24 hours
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await prisma.token.delete({
      where: { id: existingToken.id }
    })
  }

  return prisma.token.create({
    data: {
      email,
      token,
      expires,
      type,
    }
  })
}

function getToken() {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  return Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}
