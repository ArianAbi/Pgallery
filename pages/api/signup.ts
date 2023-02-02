import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown>
) {
    const dbUrl: any = process.env.dbUrl;
    const dbSecret: any = process.env.dbSecret;
    const supabase = createClient(dbUrl, dbSecret);

    const { email, password } = req.body.params

    let { data: data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (error) {
        console.log(error);
    }


    res.status(200).json(email)
}