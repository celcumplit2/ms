import {APPLY_FOR_JOB_TO_EMAIL, APPLY_TO_EMAIL, CONTACTS_TO_EMAIL, HIRE_US_TO_EMAIL, MG_DOMAIN, SCHEDULE_CONSULTATION_TO_EMAIL} from '@/modules/form/form.config';
import {validate} from '@/core/validators';
import {sendEmail} from '@/helpers/emails';
import {applyForJobFormSchema, applyFormSchema, contactsFormSchema, hireUsFormSchema, scheduleConsultationFormSchema} from '@/modules/form/forms.dto';
import {z} from 'zod';

export async function sendHirUsForm({data}: { data: Record<string, unknown> }): Promise<void> {
  const schema = await hireUsFormSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  await sendEmail({
    mgDomain: MG_DOMAIN,
    to: [HIRE_US_TO_EMAIL],
    'h:Reply-To': payload.email,
    subject: 'You received a new inquiry from MoldStud.com website',
    text: `
        Detailed info:\n\n
        Form name: Hire-Us\n
        Name: ${payload.name}\n
        Email: ${payload.email}\n
        Budget: ${payload.budget} €/£/$\n
        Interested in: ${payload.service}\n
        Message: ${payload.message}\n
      `,
  });
}

export async function sendContactsForm({data}: { data: Record<string, unknown> }): Promise<void> {
  const schema = await contactsFormSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  await sendEmail({
    mgDomain: MG_DOMAIN,
    to: [CONTACTS_TO_EMAIL],
    'h:Reply-To': payload.email,
    subject: 'You received a new message from MoldStud.com website',
    text: `
        Detailed info:\n\n
        Form name: Contacts\n
        Name: ${payload.name}\n
        Email: ${payload.email}\n
        Subject: ${payload.subject}\n
        Message: ${payload.message}\n
      `,
  });
}

export async function sendApplyForm({data}: { data: Record<string, unknown> }): Promise<void> {
  const schema = await applyFormSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;
  const files: File[] = [];

  if (payload.resume) {
    files.push(payload.resume);
  }

  if (payload.coverLetter) {
    files.push(payload.coverLetter);
  }

  await sendEmail({
    mgDomain: MG_DOMAIN,
    to: [APPLY_TO_EMAIL],
    'h:Reply-To': payload.email,
    subject: 'You received a new candidate application from MoldStud.com website',
    text: `
        Detailed info:\n\n
        Job ID: ${payload.jobId}\n
        Job Title: ${payload.jobTitle}\n
        Job URL: ${payload.jobUrl}\n
        Name: ${payload.name} ${payload.surname}\n
        Email: ${payload.email}\n
        CV: ${payload.resume.name}\n
        Cover Letter: ${payload.coverLetter ? payload.coverLetter.name : 'N/A'}\n
      `,
    attachments: files,
  });
}

export async function sendApplyForJobForm({data}: { data: Record<string, unknown> }): Promise<void> {
  const schema = await applyForJobFormSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;
  const files: File[] = [];

  if (payload.resume) {
    files.push(payload.resume);
  }

  if (payload.coverLetter) {
    files.push(payload.coverLetter);
  }

  await sendEmail({
    mgDomain: MG_DOMAIN,
    to: [APPLY_FOR_JOB_TO_EMAIL],
    'h:Reply-To': payload.email,
    subject: 'You received a new candidate application from MoldStud.com website',
    text: `
        Detailed info:\n\n
        Form: Common Application Form\n
        Name: ${payload.name} ${payload.surname}\n
        Email: ${payload.email}\n
        Phone: ${payload.phone}\n
        Telegram: ${payload.telegram}\n
        LinkedIn: ${payload.linkedin}\n
        CV: ${payload.resume.name}\n
        Cover Letter: ${payload.coverLetter ? payload.coverLetter.name : 'N/A'}\n
      `,
    attachments: files,
  });
}

export async function sendScheduleConsultationForm({data}: { data: Record<string, unknown> }): Promise<void> {
  const schema = await scheduleConsultationFormSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  await sendEmail({
    mgDomain: MG_DOMAIN,
    to: [SCHEDULE_CONSULTATION_TO_EMAIL],
    'h:Reply-To': payload.email,
    subject: 'You received a new consultation request from MoldStud.com website',
    text: `
        Detailed info:\n\n
        Form name: Schedule a Consultation\n
        Name: ${payload.name}\n
        Surname: ${payload.surname}\n
        Title: ${payload.title}\n
        Company: ${payload.company}\n
        Website: ${payload.website}\n
        Email: ${payload.email}\n
        Phone number: ${payload.phone}\n
        Budget: ${payload.budget} €\n
        Message: ${payload.message}\n
      `,
  });
}
