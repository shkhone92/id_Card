import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { uid } from 'uid';

export async function POST(request) {
    const { fullname, course, dob, address, email, expiry, phoneNumber, imageurl } = await request.json();
    const prisma = new PrismaClient();
    const stdid = "SZ" + uid(6).toUpperCase();
    try {
        const student = await prisma.students.create({
            data: {
                studentid:stdid,
                fullname,
                course,
                dob,
                address,
                email,
                expiry,
                phoneNumber,
                imageurl
            }
        });
        
        return NextResponse.json({ "status": 201,message:"successfully create account"});
    } catch (error) {
        return NextResponse.json({ "status": 404, error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
