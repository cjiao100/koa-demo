import Koa from 'koa';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import bodyParse from 'koa-bodyparser';
import koaHelmet from "koa-helmet";

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
