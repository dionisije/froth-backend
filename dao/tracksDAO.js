let tracksConnection;

export default class TracksDAO {
    static async injectDB(conn) {
        if (tracksConnection) {
            console.log('we have a connection');
            return;
        }
        try {
            tracksConnection = await conn.db(process.env.FROTH_NS).collection('tracks');
        } catch (err) {
            console.error(`Unable to establish a connection handle in AlbumsDAO: ${err}`);
        }
    };

    static async getTracks(album) {
        try {
            const tracks = await tracksConnection.find({'Catalogue': album}, {'Name': 1}).sort({'Order': 1, 'Track': 1}).toArray();
            let trackNames = [];
            
            tracks.map(item => trackNames.push(item.Name));

            return trackNames;
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }
}