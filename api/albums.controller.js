import AlbumsDAO from "../dao/albumsDAO.js";

export default class AlbumsController {
    static async apiGetAlbums(req, res, next) {
        try {            
            const response = await AlbumsDAO.getAlbums();
            res.json(response);
        } catch (err) {
            console.error(`api error: ${err}`);
            res.status(500).json({error: err});
        }
    }

    static async apiSearchAlbums(req, res, next) {
        let term = req.params.term || '';
        try {            
            const response = await AlbumsDAO.searchAlbums(term);
            res.json(response);
        } catch (err) {
            console.error(`api error: ${err}`);
            res.status(500).json({error: err});
        }
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
