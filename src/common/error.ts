import { ERROR_TYPE, HTTP_ERROR_CODE } from "./constant";

class CustomError extends Error {
    private status: number;
    private code: number;
    private type: number

    constructor(msg: string, code: number, status: number, type: number) {
        super();

        this.status = status;
        this.code = code;
        this.type = type;
    }
}

class ApiError extends CustomError {
    constructor(msg: string = '', code: HTTP_ERROR_CODE = HTTP_ERROR_CODE.API_ERROR, status: number = 200) {
        super(msg, code, status, ERROR_TYPE.API);
    }
}

class ValidationError extends CustomError {
    constructor(msg: string = '', code: HTTP_ERROR_CODE = HTTP_ERROR_CODE.VALIDATE_ERROR, status: number = 200) {
        super(msg, code, status, ERROR_TYPE.VALIDATE);
    }
}

class ServerError extends CustomError {
    constructor(msg: string = '', code: HTTP_ERROR_CODE = HTTP_ERROR_CODE.SERVER_ERROR, status: number = 200) {
        super(msg, code, status, ERROR_TYPE.SERVER);
    }
}

class DBError extends CustomError {
    constructor(msg: string = '', code: HTTP_ERROR_CODE = HTTP_ERROR_CODE.DB_ERROR, status: number = 200) {
        super(msg, code, status, ERROR_TYPE.DB);
    }
}

export {
    CustomError,
    ApiError,
    ValidationError,
    ServerError,
    DBError
}
