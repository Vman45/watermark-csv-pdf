// Load environment variables
require('dotenv/config');

const express       = require('express');
const Route         = require('./route');

const app   = express();
const route = new Route(app);

const port = process.env.REACT_APP_PORT;

route.setup();
app.listen(port, () => console.log(`Listening on port ${port}`));
