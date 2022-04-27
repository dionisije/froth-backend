import express from 'express'
import AlbumsCtrl from './albums.controller.js';

const router = express.Router();

router.route('/')
    .get(AlbumsCtrl.apiGetAlbums);

router.route('/dj')
    .get(AlbumsCtrl.apiGetDjs);

export default router;

