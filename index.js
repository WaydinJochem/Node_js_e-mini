const { express, routes } = require('./Router/routes');
// const path = require('path');
const app = express();
const port = +process.env.PORT || 2303;

app.use(express.routes('./Router'));
app.use(
    express.urlencoded({
        extended: false
    }),
    routes
);
app,get('/', (req,res)=>{
    res.send('Hello this is the home Page')
})

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
});
