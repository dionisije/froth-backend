import TracksDAO from "../dao/tracksDAO.js";

export default class TracksController {
    static async apiGetTracks(req, res, next) {
        let ref = req.params.id || {};

        try {
            const tracks = await TracksDAO.getTracks(ref);
            if (!tracks) {
                res.status(404).json({error: 'Not found'});
                return;
            }
            res.json(tracks);
        } catch (err) {
            console.error(`api error ${err}`);
            res.status(500).json({error: err});
        }
    }
}