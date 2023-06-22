import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jessicasd:JESSICAsd@cluster0.jqyov.mongodb.net/Sistema";
//mongodb+srv://jessicasd:<password>@cluster0.jqyov.mongodb.net/test;

//export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/notes-db";

