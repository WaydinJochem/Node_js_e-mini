const { express, routes } = require('./Router/routes');
const app = express();
const port = +process.env.PORT || 2303;
    


app.use('/', routes)    