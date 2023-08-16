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
