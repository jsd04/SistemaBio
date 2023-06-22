import mongoose from "mongoose";

const VisitanteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    curp: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    //datos del inquilino a vsitar
    nombreInquilino: {
      type: String,
      required: true,
    },
    parentesco: {
      type: String,
      required: true,
    },
    demo:{
      type: String,
      required: false,
    },
    //************* Datos biometricos *************** */
    
    rostro: {
      filename: { type: String },
      path: { type: String },
      originalname: { type: String },
      date: { type: Date, default: Date.now },
      size: { type: Number },
      //rostro:{ data: Buffer, contentType: String },
    },
    /* Buffer son datos binariosy en mongodb las imagenes se guardan en datos binarios
        y en el buffer datos pregunta por el tipo de contenido lo cual es una cadena
      */
    // type: Buffer, required: false
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Visitante", VisitanteSchema);