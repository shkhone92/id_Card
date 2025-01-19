import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const prisma = new PrismaClient();
      const {id} = await request.json()
    try {
        const response = await prisma.students.findUnique(
            {
                where: {
                    "studentid": id
                }
            }
        )
        
        return NextResponse.json({ "status": 200,response});
    } catch (error) {
        return NextResponse.json({ "status": 404, error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}