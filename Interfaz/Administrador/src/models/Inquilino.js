import mongoose from "mongoose";

const InquilinoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    curp: {
      type: String,
      trim: true,
      required: true,
    },
    //domicilio
    piso: {
      type: Number,
      required: true,
      trim: true,
    },

    departamento: {
      type: Number,
      trim: true,
      required: true,
    },
    telefono: {
      type: String,
      trim: true,
      required: true,
    },
    correo: {
      type: String,
      trim: true,
      required: true,
    },

    //************* Datos biometricos *************** */
    rostro: {
      filename: { type: String },
      path: { type: String },
      originalname: { type: String },
      date: { type: Date, default: Date.now },
      size: { type: Number },
      //
    },
    cara:{type: Buffer, contentType: String },
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

export default mongoose.model("Inquilino", InquilinoSchema);
