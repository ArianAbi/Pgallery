// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Data = unknown

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const dbUrl: any = process.env.dbUrl;
  const dbSecret: any = process.env.dbSecret;

  const supabase = createClient(dbUrl, dbSecret);


  res.status(200).json("hi")
}
