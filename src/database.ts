import {connect} from 'mongoose';

export async function startConexion(){

    await connect('mongodb://localhost/peliculas', {
        useNewUrlParser: true
    });

    console.log("Conectada la bd")
}

