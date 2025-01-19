import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


export async function POST(request) {
    const { id } = await request.json();
    const prisma = new PrismaClient();
    try {
          await prisma.students.delete({
            where: { id: id }
        });
        return NextResponse.json({ "status": 200, message:"deleted data" });
    } catch (error) {
        return NextResponse.json({ "status": 404, error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

