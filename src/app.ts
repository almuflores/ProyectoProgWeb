import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './rutas/index';

const app = express();



//configuracion del puerto

app.set('port', process.env.PORT || 4000);

//middleware

app.use(morgan('dev'));
app.use(express.json());

//configuracion de las rutas
app.use('/api', indexRoutes);

//carpeta para las fotos
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;