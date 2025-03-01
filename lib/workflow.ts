import { Client as WorkflowClient } from '@upstash/workflow';
import { Client as QStashClient, resend } from '@upstash/qstash';

import config from './config';

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await qstashClient.publishJSON({
      api: {
        name: 'email',
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: 'Bookwise <hello.yunushabeeb.com>',
        to: email,
        subject: subject,
        html: message,
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
