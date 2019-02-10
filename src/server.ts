import express from 'express'
import express_graphql from 'express-graphql'

import { schema } from './schema.js';

const PORT = 4000

var app = express();
app.use('/graphql', express_graphql({
    schema,
    graphiql: true,
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

