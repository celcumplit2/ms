export enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableContent = 422,
  InternalServerError = 500,
  BadGateway = 502,
}

export enum HttpStatusMessages {
  BadRequest = 'Bad Request - Often missing a required parameter.',
  Unauthorized = 'Unauthorized - Invalid API key.',
  FORBIDDEN = 'Access Denied.',
  Forbidden = 'Not Found - The requested resource doesn\'t exist.',
  Conflict = 'Conflict.',
  UnprocessableContent = 'Unprocessable Entity.',
  InternalServerError = 'Server error - something went wrong on our end.',
  BadGateway = 'The server received an invalid response from the upstream server while trying to fulfill the request.',
}
