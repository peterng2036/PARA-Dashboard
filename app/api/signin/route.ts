import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePassword, createJWT } from "@/lib/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const body = await req.json();
    if (req.method === "POST") {
        const user = await db.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid login"
            }, {
                status: 401,
            })
        }

        const isUser = await comparePassword(body.password, user.password);

        if (isUser) {
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

        } else {
            return NextResponse.json({
                error: "Invalid login"
            }, {
                status: 401,
            })

        }
    } else {
        return NextResponse.json({
            error: "Invalid login"
        }, {
            status: 402,
        })
    }
}