const { express, routes } = require('./Controller/index');
const path = require('path');
const app = express();
const port = +process.env.PORT || 3000;

//Serving Static Files
app.use(express.static('./Static'));
app.use(
    express.urlencoded({
        extended: false
    }),
);

routes.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './Static/HTML/index.html'))
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})

// Importing error handling middleware
const { errorHandling } = require("./middleware/ErrorHandling");
const cookieParser = require("cookie-parser");
// Middleware - APplication level
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});
// cookieParser & Router
// cookieParser should be set before router
app.use(cookieParser(), cors(), router);
app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  })
);
// Handling all errors
app.use(errorHandling);
// Server