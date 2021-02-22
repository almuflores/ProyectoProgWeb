import {Request, Response} from 'express';
import Foto from '../models/photo';
import path from 'path';
import fs from 'fs-extra';

//funcion para listar las fotos
export async function listarFotos(req:Request, res: Response): Promise<Response>{
    const fotos= await Foto.find();
    return res.json(fotos);
}

//funcion para buscar una foto por su id
export async function listarFoto(req:Request, res: Response): Promise<Response>{ 
    const foto = await Foto.findById(req.params.id);
    return res.json({foto});
}

//funcion para subir la foto
export async function subirFoto(req: Request, res:Response): Promise<Response>{

    const {title, description}=req.body;
    console.log(req.file.path)
    const nuevaFoto={
        title: title,
        description: description,
        imagePath: req.file.path
    };
    const foto = new Foto(nuevaFoto);
    await foto.save();

    return res.json({
        message:'Foto guardada correctamente',
        foto
    });
};

//funcion para borrar una foto

export async function borrarFoto(req: Request, res:Response): Promise<Response>{
    const{id}=req.params;
    const foto = await Foto.findByIdAndRemove(id);
    //se elimina la información pero no el archivo por lo que tenemos que eliminarlo
    if (foto){
        await fs.unlink(path.resolve(foto.imagePath))
    }
    return res.json({
        message: 'Foto borrada',
        foto
    });
};

//funcion para update 

export async function updateFoto(req: Request, res:Response): Promise<Response>{
    const{id}  =req.params;
    const{title,description}=req.body;
    const updatedFoto = await Foto.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});
    return res.json({
        message:'Foto actualizada correctamente',
        updatedFoto
    })
    
}