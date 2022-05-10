import express from 'express'
import AlbumsCtrl from './albums.controller.js';
import TracksCtrl from './tracks.controller.js';

const router = express.Router();

router.route('/')
    .get(AlbumsCtrl.apiGetAlbums);

router.route('/dj')
    .get(AlbumsCtrl.apiGetDjs);

router.route('/search/:term')
    .get(AlbumsCtrl.apiSearchAlbums);

router.route('/tracks/:id')
    .get(TracksCtrl.apiGetTracks);

export default router;
