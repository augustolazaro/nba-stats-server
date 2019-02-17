import express from 'express'
import express_graphql from 'express-graphql'
import cors from 'cors'

import nba from 'nba'

import { schema } from './schema.js';

const PORT = 4000

let app = express();
app.use(cors())
app.use('/graphql', express_graphql({
    schema,
    graphiql: true,
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// nba.stats.teamInfoCommon({ TeamID: 1610612746 })
//     .then(res => console.log('--- res:', res))
//     .catch(err => console.log('--- err:', err))