"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConexion = void 0;
const mongoose_1 = require("mongoose");
async function startConexion() {
    await mongoose_1.connect('mongodb://localhost/peliculas', {
        useNewUrlParser: true
    });
    console.log("Conectada la bd");
}
exports.startConexion = startConexion;
