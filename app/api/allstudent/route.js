import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {

    const prisma = new PrismaClient();
  
    try {
      const response = await prisma.students.findMany()
    
        return NextResponse.json({ "status": 200,response});
    } catch (error) {
        return NextResponse.json({ "status": 404, error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}