import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password should have 1 letter along with a number';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
