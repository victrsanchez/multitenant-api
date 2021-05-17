export enum ErrorCode {
    INVALID_SMS_CODE = 'InvalidSmsCode',
    INVALID_PASSWORD = 'InvalidPassword',
    PASSWORD_ALREADY_SET = 'PasswordArleadySet',
    USER_ALREADY_EXISTS = 'UserAlreadyExists',
    USER_NOT_CONFIRMED = 'UserNotConfirmed',
    MAX_NUM_ATTEMPTS_EXCEEDED = 'MaxNumAttemptsExceeded',
    SMS_EXPIRED = 'SmsExpired',
    MUST_WAIT_BEFORE_SMS_RESEND = 'MustWaitBeforeSmsResend',
    ACCOUNT_ALREADY_VERIFIED = 'AccountAlreadyVerified',
    INVALID_SMS_TYPE = 'InvalidSmsType',
    PASSWORD_IS_NOT_SET = 'PasswordIsNotSet',
}