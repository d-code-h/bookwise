import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const data = await req.json();

  try {
    await db
      .update(users)
      .set({
        role: data.newRole,
      })
      .where(eq(users.id, data.userId));

    return NextResponse.json({
      success: true,
      message: 'Role updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update role',
      error: error.message,
    });
  }
};
