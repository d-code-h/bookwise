import { db } from '@/database/drizzle';
import { borrowRecords } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const data = await request.json();

  try {
    await db
      .update(borrowRecords)
      .set({
        status: data.newStatus,
        returnDate: data.returnDate,
      })
      .where(eq(borrowRecords.id, data.borrowedId));

    return NextResponse.json({
      success: true,
      message: 'Book status updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update book status',
      error: error.message,
    });
  }
};
