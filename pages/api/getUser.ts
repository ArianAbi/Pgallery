import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown>
) {
    const dbUrl: any = process.env.dbUrl;
    const dbSecret: any = process.env.dbSecret;
    const supabase = createClient(dbUrl, dbSecret);

    let { data: data, error } = await supabase.auth.getUser()

    console.log(req.headers.cookie);

    if (error) {
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data)
        console.log(data);
    }
}