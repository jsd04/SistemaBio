import Inquilino from "../models/Inquilino.js";
//get
export const renderInquilinoForm = (req, res) => res.render("inquilinos/new-inquilino");
//post
export const createNewInquilino = async (req, res) => {
  const { nombre, curp, piso, departamento, telefono, correo,cara,name_field} = req.body;
  const errors = [];
  console.log('ejemplo',name_field)
  console.log('ejemplo2',cara)
  console.log('dody',req.body)
/*  console.log('body',rostro)
  console.log('rostro',rostro.filename)
  console.log('file',req.body.file)
  const rostro = req.file;
  console.log('file2', req.file)
  console.log('rostro', rostro)*/


  if(!cara) {
    errors.push({ text: "Por favor ingresa tus datos biométricos en especial de rostro" });
  }
  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del inquilino" });
  }
  if (!curp) {
    errors.push({ text: "Por favor escribe el curp" });
  }
  if (!piso) {
    errors.push({ text: "Por favor escribe el número de piso" });
  }
  if (!departamento) {
    errors.push({ text: "Por favor escribe el número de departamento" });
  }
  if (!telefono) {
    errors.push({ text: "Por favor escribe el número de teléfono" });
  }
  if (!correo) {
    errors.push({ text: "Por favor escribe el correo" });
  }
  
  /* *******   Correo  ******* */
  var valido= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  ///.+\@.+\..+/
  var esvalido = valido.test(correo);
  if(esvalido==false){
   // [, ''] // <- Validación regexp para correo
    errors.push({text:"Error de correo, por favor ingrese un correo válido"})
  }
  if (errors.length > 0)
    return res.render("inquilinos/new-inquilino", {
      errors,
      nombre,
      curp,
      piso,
      departamento,
      telefono,
      correo,cara,
    });

  const newInquilino = new Inquilino({ 
      nombre,
      curp,
      piso,
      departamento,
      telefono,
      correo,
     /* rostro:{ 
        data : req.file.filename,
        contentType: 'image/png',
        filename : req.file.filename,
        path : '/uploads/' + req.file.filename,
        originalname : req.file.originalname,
        date : req.file.date,
        size : req.file.size,
        },*/
      cara,
    
  });
  newInquilino.user = req.user.id;
  await newInquilino.save();
  console.log('Inquilino guardado',newInquilino)
  req.flash("success_msg", "Inquilino añadido exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
};
 /****************************** */
//get
// export const facialForm = async (req, res) => res.render("new-facial");
 //res.render("new-facial");res.render("inquilinos/new-inquilino");
 export const facialForm = async (req, res) => {
 const inquilino = await Inquilino.findById(req.params.id).lean();
 res.render("inquilinos/edit-inquilino", { inquilino });
 };
//post
export const createNewfacial = async (req, res) => {
  const { cara } = req.body;
  console.log('Jessica ejemplo')
  console.log('cara',req.body)
  const errors = [];
  if (errors.length > 0)
    return res.render("new-facial", {
      errors,
      cara,
    });

  const newFacial= new Inquilino({ 
    nombre,
      curp,
      piso,
      departamento,
      telefono,
      correo,
     cara
  });
  await Inquilino.findByIdAndUpdate(req.params.id, { nombre, curp, piso, departamento, telefono, correo,cara});
  req.flash("success_msg", "Inquilino actualizado exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
 /* newInquilino.user = req.user.id;
  await newInquilino.save();
  console.log('usuariogaudado',newInquilino)
  req.flash("success_msg", "Inquilino añadido exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
  newFacial.user = req.user.id;
  await newFacial.save();
  console.log('rostro enviado',newFacial)
  req.flash("success_msg", "Rostro guardada exitosamente");
  res.redirect("/inquilinos/add",{newFacial});*/
};

export const updateFacial= async (req, res) => {
  const { cara } = req.body;
  await Inquilino.findByIdAndUpdate(req.params.id, { cara});
  req.flash("success_msg", "Inquilino actualizado exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
};


export const renderInquilinos = async (req, res) => {
  const inquilinos = await Inquilino.find({ user: req.user.id })
    .sort({ date: "desc" })//ordenar datos de manera descendente
    .lean();
  res.render("inquilinos/all-inquilinos", { inquilinos });
};

export const renderInquilinosInicial = async (req, res) => {
  res.render("inquilinos/inquilinos_inicial_copy");
}

export const renderEditForm = async (req, res) => {
  const inquilino = await Inquilino.findById(req.params.id).lean();
 /* if (inquilino.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/inquilinos/all-inquilinos");
  }*/
  res.render("inquilinos/edit-inquilino", { inquilino });
};

export const updateInquilino= async (req, res) => {
  const { nombre, curp, piso, departamento, telefono, correo } = req.body;
  await Inquilino.findByIdAndUpdate(req.params.id, { nombre, curp, piso, departamento, telefono, correo});
  req.flash("success_msg", "Inquilino actualizado exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
};

export const deleteInquilino= async (req, res) => {
  await Inquilino.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Inquilino eliminado  exitosamente");
  res.redirect("/inquilinos/all-inquilinos");
};

export const searchInquilinos = async (req, res) => {
  //console.log('query -> ',req.query)
  if(req.query.buscar && req.query.piso && req.query.dep){
    console.log("buscar ", req.query.buscar)
    console.log("piso ", req.query.piso)
    console.log("dep ", req.query.dep)
    const inquilinosFound = await Inquilino.find(
      { $and: [ {nombre:{ $regex:  req.query.buscar, $options:"$i"}},
       {piso:{$eq:req.query.piso}}, {departamento:{$eq:req.query.dep}} ]} )
    //.sort({ date: "desc" })}
     // {nombre:{ $regex: req.query.buscar, $options:"$i"}})
    /* ***************** regex y options **************
      Usa $ regex operador como una expresión regular para encontrar patrones en una cadena.
      Para distinguir entre mayúsculas y minúsculas, las expresiones regulares utilizan 
      $ opción y el parámetro con un valor de $ i */

      //const inquilinosFound = await Inquilino.find({nombre:{ $eq: req.query.buscar}})
    .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if(req.query.buscar && req.query.piso){
    console.log("buscar2 ", req.query.buscar)
    console.log("piso2 ", req.query.piso)
    console.log("dep2 ", req.query.dep)
    const inquilinosFound = await Inquilino.find( { $and: [ {nombre:{ $regex:  req.query.buscar, $options:"$i"}}, {piso:{$eq:req.query.piso}} ]})
    .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if(req.query.buscar &&  req.query.dep ){
    console.log("buscar3 ", req.query.buscar)
    console.log("piso3 ", req.query.piso)
    console.log("dep3 ", req.query.dep)
    const inquilinosFound = await Inquilino.find(
      ( { $and: [ {nombre:{ $regex:  req.query.buscar, $options:"$i"}}, {departamento:{$eq:req.query.dep}} ]}) 
      )
      .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if((req.query.piso && req.query.dep) ){
    console.log("buscar4 ", req.query.buscar)
    console.log("piso4 ", req.query.piso)
    console.log("dep4 ", req.query.dep)
    const inquilinosFound = await Inquilino.find(
      ( { $and: [ {piso:{$eq:req.query.piso}}, {departamento:{$eq:req.query.dep}} ]})
      )
      .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if(req.query.buscar){
    console.log("buscar ", req.query.buscar)
    const inquilinosFound = await Inquilino.find({nombre:{ $regex: req.query.buscar, $options:"$i"}})
    /* ***************** regex y options **************
      Usa $ regex operador como una expresión regular para encontrar patrones en una cadena.
      Para distinguir entre mayúsculas y minúsculas, las expresiones regulares utilizan 
      $ opción y el parámetro con un valor de $ i */

    //const inquilinosFound = await Inquilino.find({nombre:{ $eq: req.query.buscar}})
    .sort({ date: "desc" })
    .lean();
    console.log('El Inquilino que coincidio es :   ', inquilinosFound)
    res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if(req.query.piso){
    console.log("piso ", req.query.piso)
    const inquilinosFound = await Inquilino.find( {piso:{$eq:req.query.piso}} )
    .sort({ date: "desc" })
    .lean();
    console.log('El Inquilino que coincidio es :   ', inquilinosFound)
    res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else if(req.query.dep){
    console.log("departamento", req.query.dep)
    const inquilinosFound = await Inquilino.find({departamento:{$eq:req.query.dep}})
    .sort({ date: "desc" })
    .lean();
    console.log('El Inquilino que coincidio es :   ', inquilinosFound)
    res.render("inquilinos/search-inquilinos",{ inquilinosFound })
  }
  else{
    console.log("no hay parametro")
    res.render("inquilinos/search-inquilinos")
  }
}