const express = require('express');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const routerApi = require('./routes');
const {checkApiKey} = require('./middlewares/auth.handler');
const app = express();
const port = process.env.PORT || 3001;
const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Access denied'));
    }
  },
};

app.use(express.json());
app.use(cors(options));

const passport = require('passport');

app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hello, I am the new route ');
});

require('./utils/auth')
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
