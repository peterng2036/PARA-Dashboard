import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();


    const user = await db.user.create(
        {
            data: {
                email: body.email,
                password: await hashPassword(body.password),
                firstName: body.firstName,
                lastName: body.lastName
            }
        }
    )


    const jwt = await createJWT(user);

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            'Set-Cookie': serialize(process.env.COOKIE_NAME || '', jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        },
    })
}