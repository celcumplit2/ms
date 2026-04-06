import {HttpStatus} from '@/helpers/http';

export enum ProblemDetailType {
  BadRequest = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400',
  Unauthorized = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401',
  Forbidden = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403',
  NotFound = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404',
  Conflict = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409',
  UnprocessableContent = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422',
  InternalServerError = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500',
}

/**
 * {
 *   "type": "https://example.com/probs/out-of-credit",
 *   "status": 400,
 *   "title": "You do not have enough credit.",
 *   "detail": "Your current balance is 30, but that costs 50.",
 *   "instance": "/account/12345/msgs/abc",
 * }
 */
export interface ProblemDetail {
  type: ProblemDetailType;
  status: HttpStatus;
  title: string;
  detail?: string;
  instance?: string;
  errors?: Record<string, string>;
}
