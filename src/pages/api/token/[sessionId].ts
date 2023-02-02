import { NextApiRequest, NextApiResponse } from "next";
import OpenTok from 'opentok';
import { opentokConfig } from '@/config/opentok';

const opentok = new OpenTok(opentokConfig.apiKey, opentokConfig.secretkey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const { sessionId } = req.query;
 const token = opentok.generateToken(sessionId as string);
 res.json({token})
  }