import Administrador from "../models/Administrador.js";

export const createAdminUser = async () => {
  const userFound = await Administrador.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    username: "admin",
    email: "admin@localhost",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Administrador creado", admin);
};
