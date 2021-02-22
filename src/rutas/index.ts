import {Router} from 'express';
const router = Router();

import {subirFoto, listarFotos, listarFoto, borrarFoto, updateFoto} from '../controllers/photo.controller';
import multer from '../libs/multer';

router.route('/fotos')
    .post(multer.single('image'),subirFoto)
    .get(listarFotos)


router.route('/fotos/:id')
.get(listarFoto)
.delete(borrarFoto)
.put(updateFoto)


export default router;