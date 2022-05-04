import { ObjectId } from "mongodb";

let albumsConnection;

export default class AlbumsDAO {
    static async injectDB(conn) {
        if (albumsConnection) {
            console.log('we have a connection');
            return;
        }
        try {
            albumsConnection = await conn.db(process.env.FROTH_NS).collection('albums');
        } catch (err) {
            console.error(`Unable to establish a connection handle in AlbumsDAO: ${err}`);
        }
    };

    static async getAlbums() {
        try {
            const originalSeries = await albumsConnection.find({'Catalogue': {$regex: /DVDCDR\d+/}}).sort({'Catalogue': 1}).toArray();
            const classicSeries = await albumsConnection.find({'Catalogue': {$regex: /DVDCD\d+/}}).sort({'Catalogue': 1}).toArray();
            const streamSeries = [];

            console.log({originalSeries, classicSeries, streamSeries});
            return {originalSeries, classicSeries, streamSeries};
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }

    static async getDjs() {
        let djList = [];
        try {
            djList = await albumsConnection.distinct('DJ');
            console.log('djList', djList);
            return djList;
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }
};
