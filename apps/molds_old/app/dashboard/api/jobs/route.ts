import {convertErrorToProblemDetail} from '@/helpers/errors';
import {addJob} from '@/modules/job/job.service';
import {revalidatePath} from 'next/cache';

export async function POST(request: Request) {
  try {
    const job = await addJob({
      data: await request.json(),
    });

    revalidatePath('/careers');
    revalidatePath('/dashboard/jobs');

    return Response.json(job);
  } catch (error) {
    if (error instanceof Error) {
      const problemDetail = convertErrorToProblemDetail(error);

      return Response.json(convertErrorToProblemDetail(error), {
        status: problemDetail.status,
      });
    }

    return Response.json({
      status: 500,
      type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500',
      title: 'Internal Server Error',
    }, {
      status: 500,
    });
  }
}
