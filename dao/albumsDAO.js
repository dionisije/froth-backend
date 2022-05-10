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
            const originalSeries = await albumsConnection.find({'Catalogue': {$regex: /DVDCDR\d+/}}).sort({'Order': -1}).toArray();
            const classicSeries = await albumsConnection.find({'Catalogue': {$regex: /DVDCD\d+/}}).sort({'Order': -1}).toArray();
            const streamingSeries = await albumsConnection.find({'Catalogue': {$regex: /DVDPL\d/}}).sort({'Order': -1}).toArray();

            console.log({originalSeries, classicSeries, streamingSeries});
            return {originalSeries, classicSeries, streamingSeries};
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }

    static async searchAlbums(term) {
        const searchTerm = new RegExp(term, 'i');
        try {
            const results = await albumsConnection.find({Name: {"$regex": searchTerm}}).sort({'Order': 1}).toArray();

            console.log(results);
            return results;
        } catch (err) {
            
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
