import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import AlbumsDAO from './dao/albumsDAO.js';

dotenv.config({ path: './.env.local' });

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.FROTH_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    await AlbumsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
});
