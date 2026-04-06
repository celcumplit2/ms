import {convertErrorToProblemDetail} from '@/helpers/errors';
import {HttpStatus, HttpStatusMessages} from '@/helpers/http';
import {FormState} from '@/hooks/use-action-state';
import {ProblemDetailType} from '@/types/errors';

export function createSuccessfulResponse(response: unknown, formData: FormData): FormState {
  return {
    success: true,
    formData: formData ?? new FormData(),
    response,
  };
}

export function createFailedResponse(error: unknown | Error, formDate: FormData): FormState {
  return {
    success: false,
    formData: formDate ?? new FormData(),
    error: !(error instanceof Error) ? {
      type: ProblemDetailType.InternalServerError,
      status: HttpStatus.InternalServerError,
      title: HttpStatusMessages.InternalServerError,
      detail: String(error),
    } : convertErrorToProblemDetail(error),
  };
}

export async function withActionErrorHandler(
  fn: () => Promise<unknown>,
  formData: FormData,
) {
  try {
    return createSuccessfulResponse(await fn(), formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}

export async function withActionErrorHandlerBack(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => Promise<unknown>,
  formData: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) {
  try {
    return createSuccessfulResponse(await fn(...args), formData);
  } catch (error) {
    return createFailedResponse(error, formData);
  }
}
