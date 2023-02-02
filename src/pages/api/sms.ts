import { NextApiRequest, NextApiResponse } from "next";
import { vonage } from "@/lib/vonage";

const from = "Vonage APIs"
const TO = '923357562366'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {message} = req.body;
    if(typeof message !== 'string' || message.length === 0) {
        return res.status(404).json({msg: "Please provide message to send"});
    }
   try {
      await vonage.sms.send({to: TO, from, text: message});
   }
   catch(err: any) {
    return res.status(500).json({msg: err.message});
   }
    return res.json({success: true});
  }