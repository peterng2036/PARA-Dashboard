import { createJWT, hashPassword, validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const aa = process.env.COOKIE_NAME || ''
    const jwt = req.cookies.get(aa)?.value || '';

    const user = await validateJWT(jwt);

    const body = await req.json();

    await db.project.create({
        data: {
            name: body!.name,
            ownerId: user.id,
        },
    });

    return new Response('Hello, Next.js!', {
        status: 200,
    })
}