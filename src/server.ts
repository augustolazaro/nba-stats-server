import express from 'express'
import express_graphql from 'express-graphql'
import cors from 'cors'

import { schema } from './schema.js';

const PORT = process.env.PORT || 4000

let app = express();
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use('/graphql', express_graphql({
    schema,
    graphiql: true,
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
