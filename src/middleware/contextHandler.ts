import _ from "lodash";
import { HTTP_ERROR_CODE } from "../common/constant";

export default async (ctx, next) => {
   ctx.context = {};

   ctx.resFail = (code = HTTP_ERROR_CODE.UNKNOWN_ERROR, message = '', data = null, status = 200) => {
       ctx.body = {
           errno: code,
           errmsg: message,
           data
       };

       ctx.status = status;
   }

   ctx.resSucess = (data = null) => {
       ctx.body = {
           errno: HTTP_ERROR_CODE.SUCCESS,
           errmsg: '',
           data
       }
       ctx.status = 200;
   }

   ctx.getRequest = () => ctx.validation;
   ctx.setRequest = (args) => {
       _.merge(ctx.validation, args);
   }


   ctx.setCtxParams = (key, value) => {
       _.set(ctx.context, key, value);
   }

   ctx.getCtxParams = (key, defaultValue) => {
      return _.get(ctx.context, key, defaultValue);
   }

   ctx.hasCtxParams = (key) => {
       return _.has(ctx.context, key);
   }

   await next();
}
