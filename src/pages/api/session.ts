import { NextApiRequest, NextApiResponse } from "next";
import OpenTok from 'opentok';
import { opentokConfig } from '@/config/opentok';

const opentok = new OpenTok(opentokConfig.apiKey, opentokConfig.secretkey);


type CreateSessionFn = () => Promise<OpenTok.Session | undefined>;

const createSession: CreateSessionFn = async () => new Promise((resolve, reject) => {
    opentok.createSession({},(error, session) => {
        if(error) {
            reject(error);
        }
        resolve(session);
      })
})


export default async function handler(_: NextApiRequest, res: NextApiResponse) {
   const session =  await createSession();
    res.json({sessionId: session?.sessionId})
  }