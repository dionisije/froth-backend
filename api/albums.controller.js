import AlbumsDAO from "../dao/albumsDAO.js";

export default class AlbumsController {
    static async apiGetAlbums(req, res, next) {
        const response = await AlbumsDAO.getAlbums();
        res.json(response);
    }

    static async apiGetDjs(req, res, next) {
        try {
            const djs = await AlbumsDAO.getDjs();
            res.json(djs);
        } catch (err) {
            console.error(`api error: ${err}`);
            res.status(500).json({error: err});
        }
    }
};
