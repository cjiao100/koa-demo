import { ERROR_TYPE } from "../common/constant";

export default async (ctx, next) => {
    try {
        await next()
    } catch(err) {
        let responseMessage;
        switch (err.code) {
            case ERROR_TYPE.API:
            case ERROR_TYPE.VALIDATE:
                responseMessage = err.message;
                break;
            case ERROR_TYPE.DB:
            case ERROR_TYPE.SERVER:
                responseMessage = '服务错误';
                break;
            default:
                responseMessage = '未知错误';
        }

        ctx.resFail(err.code, responseMessage, null, err.status);
    }
}
