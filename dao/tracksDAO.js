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
            const output = [];
            const tracks = await tracksConnection.find({'Catalogue': album}).sort({'Order': 1, 'Track': 1}).toArray();
            const discCount = tracks[0]['Disc Count'];
            let discNumber = 1;
            do {
                const discTracks = tracks.filter(track => track.Disc === discNumber);
                output.push(discTracks);
                discNumber++;
            } while (discNumber <= discCount);

            return output;
        } catch (err) {
            console.error(`Unable to get albums: ${err}`);
        }
    }
}