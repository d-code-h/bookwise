import { serve } from '@upstash/workflow/nextjs';

type InitialData = {
  email: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload;

  // New user signup
  await context.run('new-signup', async () => {
    await sendEmail('Welcome to the platform', email);
  });

  // Intial waiting period
  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3);

  // Periodic state check
  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState();
    });

    // Send email to non-active users
    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail('Email to non-active users', email);
      });
    } else if (state === 'active') {
      // Send email to active users
      await context.run('send-email-active', async () => {
        await sendEmail('Send newsletter to active users', email);
      });
    }

    // Wait for 1 month
    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30);
  }
});

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`);
}

type UserState = 'non-active' | 'active';

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return 'non-active';
};
