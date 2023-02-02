const opentokConfig = {
  apiKey: process.env.NEXT_PUBLIC_OPENTOK_API_KEY ?? '',
  secretkey: process.env.NEXT_PUBLIC_OPENTOK_SECRET ?? '',
  sessionId: process.env.NEXT_PUBLIC_OPENTOK_SESSION_ID ?? '',
  token: process.env.NEXT_PUBLIC_OPENTOK_TOKEN ?? '',
};

export { opentokConfig }