import Administrador from "../models/Administrador.js";
import passport from "passport";

//Para registarse
export const renderSignUpForm = (req, res) => res.render("administradores/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, telefono, domicilio, password, confirm_password} = req.body;
  console.log('dody',req.body)
  console.log('body',name)
  const rostro = req.file;
  console.log('file', req.file)
  console.log('rostro', rostro)

  if (!name) {
    errors.push({ text: "Por favor escribe el nombre del inquilino" });
  }
  if(!rostro) {
    errors.push({ text: "Por favor ingresa tus datos biométricos en especial de rostro" });
  }
  if(name.length <= 0 || telefono.length<=0 || domicilio.length<=0 || password.length<=0 || email.length<=0 || confirm_password.length<=0){
    errors.push({text: 'Por favor ingresa todos tus datos'});
  }
  /* *******   Correo  ******* */
  var valido= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  ///.+\@.+\..+/
  var esvalido = valido.test(email);
  if(esvalido==false){
   // [, ''] // <- Validación regexp para correo
    errors.push({text:"Error de correo, por favor ingrese un correo válido"})
  }
  /* *******   Contraseña  ******* */
  var valipassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/
  var esvalipassword=valipassword.test(password)
  if (!esvalipassword) {
    errors.push({ 
      text: " La contraseña debe cumplir los siguientes requerimientos: *Al menos una letra, *Al menos una letra mayúscula, *Al menos un número, *Al menos 8 carácteres. " 
    });
  }
  /*
  else {//La contraseña no cumple las condiciones.
    req.flash("success_msg", "Contraseña valida. ");
  }*/
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  
 
  if (errors.length > 0) {
    return res.render("administradores/signup", {
      errors,
      name,
      email,
      telefono,
      domicilio,
      password,
      confirm_password,rostro,
    });
  }
  // Look for email coincidence
  const adminFound = await Administrador.findOne({ email: email });
  if (adminFound) {
    req.flash("error_msg", "El correo ya esta en uso.");
    return res.redirect("/administradores/signup");
  }
  
  /* ************* Subida de foto  *********** */

  // Saving a New Administrador Admin
  const newUser = new Administrador({ 
    name, 
    email,
    telefono,
    domicilio, 
    password,
    rostro:{ 
      data : req.file.filename,
      contentType: 'image/png',
      filename : req.file.filename,
      path : '/uploads/' + req.file.filename,
      originalname : req.file.originalname,
      date : req.file.date,
      size : req.file.size,
      /*rostro:{
        data:req.file.filename,
        contentType: 'image/png'}*/
    }
  });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  console.log('usuariogaudado',newUser)
  req.flash("success_msg", " El registro ha sido un éxito.");
  res.redirect("/administradores/signin");
};

//para ingresar
export const renderSigninForm = (req, res) => res.render("administradores/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/administradores/principal",
  failureRedirect: "/administradores/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Estás desconectado ahora.");
    res.redirect("/administradores/signin");
  });
};
export const renderAuth = async (req, res) => {
  const admin = await Administrador.find({ admin: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("administradores/administradores", { admin});
};

export const renderMyAuth= async (req, res) => {
  const administradorFound = await Administrador.find({name:{$eq: req.user.name}})
  //Administrador.find({administradorFound:{ $eq: req.user.id}})
    .sort({ date: "desc" })
    .lean();
    console.log('El Administrador que coincidio es: ', administradorFound)
    //res.render("administradores/perfil", { administradorFound } );
  const admin = await Administrador.find({ admin: req.user.id })
    .sort({ date: "desc" })
    .lean();
      console.log('Los otros admin son: ', admin)
  res.render("administradores/perfil", { admin, administradorFound} );
}
export const renderAuthIni = async (req, res) => {
  res.render("administradores/principal");
}

export const renderEditForm = async (req, res) => {
  const admin = await Administrador.findById(req.params.id).lean();
  res.render("administradores/edit-admin", { admin });
};

export const updateAdmin= async (req, res) => {
  const { name, email,telefono, domicilio,rostro } = req.body;
  await Administrador.findByIdAndUpdate(req.params.id, { name, email,telefono, domicilio,rostro });
  req.flash("success_msg", "Administrador actualizado exitosamente");
  res.redirect("/administradores/perfil");
};


