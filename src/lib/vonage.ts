import { Vonage } from "@vonage/server-sdk"

const API_KEY = process.env.NEXT_PUBLIC_VONAGE_API_KEY as string;
const API_SECRET = process.env.NEXT_PUBLIC_VONAGE_API_SECRET as string;

export const vonage = new Vonage({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
  })