import mongoose from "mongoose";

// Se crea el esquema del usuario administrador y los datos que contendra este usuario.
const Image2Schema = new mongoose.Schema(
  {
   
    
    rostro:{ 
      data: Buffer, contentType: String,
      filename:{ type:String },
      path:{ type:String },
      originalname:{ type:String },
      date:{ type: Date, default: Date.now},
      size:{  type: Number},
    }
     /* Buffer son datos binariosy en mongodb las imagenes se guardan en datos binarios
        y en el buffer datos pregunta por el tipo de contenido lo cual es una cadena
      */
    // type: Buffer, required: false
  },
  
);


export default mongoose.model("Image2", Image2Schema);
