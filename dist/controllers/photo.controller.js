"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoto = exports.borrarFoto = exports.subirFoto = exports.listarFoto = exports.listarFotos = void 0;
const photo_1 = __importDefault(require("../models/photo"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
//funcion para listar las fotos
async function listarFotos(req, res) {
    const fotos = await photo_1.default.find();
    return res.json(fotos);
}
exports.listarFotos = listarFotos;
//funcion para buscar una foto por su id
async function listarFoto(req, res) {
    const foto = await photo_1.default.findById(req.params.id);
    return res.json({ foto });
}
exports.listarFoto = listarFoto;
//funcion para subir la foto
async function subirFoto(req, res) {
    const { title, description } = req.body;
    console.log(req.file.path);
    const nuevaFoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    };
    const foto = new photo_1.default(nuevaFoto);
    await foto.save();
    return res.json({
        message: 'Foto guardada correctamente',
        foto
    });
}
exports.subirFoto = subirFoto;
;
//funcion para borrar una foto
async function borrarFoto(req, res) {
    const { id } = req.params;
    const foto = await photo_1.default.findByIdAndRemove(id);
    //se elimina la información pero no el archivo por lo que tenemos que eliminarlo
    if (foto) {
        await fs_extra_1.default.unlink(path_1.default.resolve(foto.imagePath));
    }
    return res.json({
        message: 'Foto borrada',
        foto
    });
}
exports.borrarFoto = borrarFoto;
;
//funcion para update 
async function updateFoto(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedFoto = await photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({
        message: 'Foto actualizada correctamente',
        updatedFoto
    });
}
exports.updateFoto = updateFoto;
