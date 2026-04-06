import {UnexpectedApplicationLogic} from '@/core/errors/unexpected-application-logic';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {objectErrorsToFormDataErrors} from '@/helpers/form-data';
import {HttpStatus, HttpStatusMessages} from '@/helpers/http';
import {ProblemDetail, ProblemDetailType} from '@/types/errors';

export function convertErrorToProblemDetail(error: Error): ProblemDetail {
  switch (true) {
    case error instanceof UnprocessablePayload:
      return {
        type: ProblemDetailType.UnprocessableContent,
        status: HttpStatus.UnprocessableContent,
        title: HttpStatusMessages.UnprocessableContent,
        errors: objectErrorsToFormDataErrors(error.errors),
      };
    case error instanceof UnexpectedApplicationLogic:
      return {
        type: ProblemDetailType.BadRequest,
        status: HttpStatus.BadRequest,
        title: HttpStatusMessages.BadRequest,
        detail: error.message,
      };
    default:
      return {
        type: ProblemDetailType.InternalServerError,
        status: HttpStatus.InternalServerError,
        title: HttpStatusMessages.InternalServerError,
        detail: error.message,
      };
  }
}
