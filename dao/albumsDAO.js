let albumConnection;

export default class AlbumsDAO {
    static async injectDB(conn) {
        if (albumConnection) {
            console.log('we have a connection');
            return;
        }
        try {
            console.log('make a connection');
            albumConnection = await conn.db(process.env.FROTH_NS).collection('albums');
        } catch (err) {
            console.error(`Unable to establish a connection handle in AlbumsDAO: ${err}`);
        }
    };

    static async getAlbums() {
        let cursor;
        try {
            cursor = await albumConnection.find();
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return {};
        }

        try {
            const albumList = await cursor.toArray();
            const count = await albumConnection.countDocuments({});
            console.log('albumList', albumList);
            console.log('Total:', count);
            return albumList;
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }

    static async getDjs() {
        let djList = [];
        try {
            djList = await albumConnection.distinct('DJ');
            console.log('djList', djList);
            return djList;
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }
};
