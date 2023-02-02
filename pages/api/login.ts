import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { setCookie } from 'cookies-next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown>
) {
    const dbUrl: any = process.env.dbUrl;
    const dbSecret: any = process.env.dbSecret;
    const supabase = createClient(dbUrl, dbSecret);

    const { email, password } = req.body.params

    let { data: data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data)
        console.log(data.session);
    }
}