import app from './app';
import {startConexion} from './database';

async function main(){
    startConexion();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();

