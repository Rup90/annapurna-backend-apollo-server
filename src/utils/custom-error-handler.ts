import  logger  from './logger';
export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

type ErrorCode = HttpStatusCode | 'DbErrorCode' | 'WsErrorCode' | 'FsErrorCode';


class AppError extends Error {
    public readonly statusCode: ErrorCode;
    public readonly isOperational: boolean;
    public customErrorDescription: any;
    constructor(
        description: string,
        httpCode: ErrorCode,
        isOperational: boolean
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);

        // Implement Logger Here
        this.customErrorDescription = {
            statusCode: this.statusCode,
            description: description
        };
        logger.log('error', this.customErrorDescription);
    }
}

export class APIError extends AppError {
    constructor(
        description: string = 'Internal server error',
        httpCode: ErrorCode = HttpStatusCode.INTERNAL_SERVER,
        isOperational: boolean = true,
    ) {
        super(description, httpCode, isOperational);
    }
}

export class DBError extends AppError {
    constructor(
        description: string = 'Record processing error',
        dbErrorCode: ErrorCode = 'DbErrorCode',
        isOperational: boolean = true,
    ) {
        super(description, dbErrorCode, isOperational);
    }
}

// export class AuthenticationError {
//     constructor() {
//         super(name, description, dbErrorCode, isOperational);
//         console.log('=====??=======>', description);
//     }
// }

export default (errorCode: any) => {
    const code = errorCode.code;
    switch (code) {
        case 'INTERNAL_SERVER_ERROR':
            return new APIError();
            break;
    
        default:
            break;
    }
}