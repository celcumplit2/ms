import {UnexpectedApplicationLogic} from '@/core/errors/unexpected-application-logic';

export class UnprocessablePayload extends UnexpectedApplicationLogic {
  constructor(readonly errors: Record<string, string>) {
    super('Unprocessable payload provided.');
  }
}
