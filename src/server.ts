import app from "./app";
import config from '../config';

const startServer = async () => {
    app.listen(config.port)
}

startServer()
