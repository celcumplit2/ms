import {FROM_BOT_EMAIL} from '@/modules/form/form.config';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import {MailgunMessageData, MessagesSendResult} from 'mailgun.js/definitions';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'API-KEY',
});

// TODO: Move this to a service file. Probably it's part of a mailer module.
export async function sendEmail(
  {from = FROM_BOT_EMAIL, to, subject, text, attachment, mgDomain, attachments = [], ...restParams}: MailgunMessageData & {
    mgDomain: string;
    attachments?: File[];
  },
): Promise<MessagesSendResult> {
  const files: { filename: string; data: Buffer }[] = [];

  for (const file of attachments) {
    files.push({
      filename: file.name,
      data: Buffer.from(await file.arrayBuffer()),
    });
  }

  const params = {
    ...restParams,
    from,
    to,
    subject,
    text,
    attachment: files.length > 0 ? files : attachment,
  };

  return mg.messages.create(mgDomain, params as MailgunMessageData);
}
