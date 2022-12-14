export enum ERROR_TYPE {
    SUCCESS ,
    VALIDATE,
    API,
    DB,
    SERVER,
    UNKNOWN = 9
}

export enum HTTP_ERROR_CODE {
    SUCCESS,
    UNKNOWN_ERROR = 19099,
    VALIDATE_ERROR = 11099,
    API_ERROR = 12099,
    DB_ERROR = 13099,
    SERVER_ERROR = 14099
}
