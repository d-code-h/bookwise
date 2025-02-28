import { Client as WorkflowClient } from '@upstash/workflow';
import config from './config';
import emailjs from '@emailjs/browser';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const { serviceId, publicKey, templateId } = config.env.emailjs;

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
    // Intialize emailjs
    emailjs.init(publicKey);

    // Send email
    await emailjs.send(serviceId, templateId, {
      from_name: 'Bookwise <habeebdh1@gmail.com>',
      to_email: email,
      project: 'Bookwise',
      subject: subject,
      message: message,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
