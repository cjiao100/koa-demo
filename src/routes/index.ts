import Router from '@koa/router';
import Joi from 'joi';
import _ from 'lodash';
import { ValidationError } from "../common/error";

const router = new Router();
const CustomRouterModules = [];

const routerSchema = Joi.object({
    apiInfo: Joi.object({
        path: Joi.string().required(),
        validate: Joi.object().required()
    }).required(),
    middlewares: Joi.array().required()
}).required();

class CustomRouter {
    prefix: string;

    setPrefix(prefix: string) {
        this.prefix = prefix;
    }

    private static validate(apiInfo, middlewares) {
        const result = routerSchema.validate({
            apiInfo,
            middlewares
        });

        if (result.error) {
            throw new Error('router register error')
        }
    }

    private static method(apiSchema) {
        return async (ctx, next) => {
            const { error, value } = apiSchema.validate({
                body: ctx.request.body,
                query: ctx.request.query,
                params: ctx.request.params
            });

            if (error) {
                throw new ValidationError(error.message);
            }

            ctx.validation = _.merge({}, value.query, value.body, value.params);
        }
    }

    get(apiInfo, middlewares) {
        CustomRouter.validate(apiInfo, middlewares);
        const { path, validate: apiSchema } = apiInfo;

        router.get(`${this.prefix}${path}`, CustomRouter.method(apiSchema), ...middlewares);
    }

    post(apiInfo, middlewares) {
        CustomRouter.validate(apiInfo, middlewares);
        const { path, validate: apiSchema } = apiInfo;

        router.post(`${this.prefix}${path}`, CustomRouter.method(apiSchema), ...middlewares);
    }

    put(apiInfo, middlewares) {
        CustomRouter.validate(apiInfo, middlewares);
        const { path, validate: apiSchema } = apiInfo;

        router.put(`${this.prefix}${path}`, CustomRouter.method(apiSchema), ...middlewares);
    }

    del(apiInfo, middlewares) {
        CustomRouter.validate(apiInfo, middlewares);
        const {path, validate: apiSchema} = apiInfo;

        router.del(`${this.prefix}${path}`, CustomRouter.method(apiSchema), ...middlewares);
    }
}

const cRouter = new CustomRouter();
CustomRouterModules.forEach((module) => {
    cRouter.prefix = '';
    module(cRouter);
})

const register = (app) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
}

export default {
    register
}
