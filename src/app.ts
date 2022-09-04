import Koa from 'koa';
import * as conditional from 'koa-conditional-get';
import * as etag from 'koa-etag';
import * as bodyParse from 'koa-bodyparser';
import * as koaHelmet from "koa-helmet";

import routes from './routes';
import { contextHandler, errorHandler } from './middleware';


const app = new Koa();

app.use(conditional());
app.use(etag());
app.use(koaHelmet());
app.use(bodyParse());

app.use(contextHandler)
app.use(errorHandler)

routes.register(app);

export default app;
