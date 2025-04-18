import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { sendEmail } from '@/lib/workflow';
import { serve } from '@upstash/workflow/nextjs';
import { eq } from 'drizzle-orm';

type UserState = 'non-active' | 'active';

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return 'non-active';
  }
  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const today = new Date();
  const timeDifference = today.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) {
    return 'non-active';
  }

  return 'active';
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // New user signup
  await context.run('new-signup', async () => {
    await sendEmail({
      email,
      subject: 'Welcome to Bookwise',
      message: `Hi ${fullName}, welcome to Bookwise!`,
    });
  });

  // Intial waiting period
  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3);

  // Periodic state check
  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email);
    });

    // Send email to non-active users
    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'Are you still there?',
          message: `Hi ${fullName}, we haven't seen you in a while. Are you still interested in Bookwise?`,
        });
      });
    } else if (state === 'active') {
      // Send email to active users
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: `Welcome back!`,
          message: `Hi ${fullName}, welcome back to Bookwise!`,
        });
      });
    }

    // Wait for 1 month
    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30);
  }
});
