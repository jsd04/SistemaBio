import express from 'express'
import exphbs from "express-handlebars";
import path from 'path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import flash from "connect-flash";
import methodOverride from "method-override";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { MONGODB_URI, PORT } from "./config.js";
import "./config/passport.js";
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import webcam from 'node-webcam';




import indexRoutes from './routes/index.router.js';
import inquilinosRoutes from "./routes/inquilinos.router.js";
import userRoutes from "./routes/administradores.routes.js";
import visitantesRoutes from './routes/visitantes.router.js';
import trabajadoresRoutes from './routes/trabajadores.router.js';

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//settings
//app.set('port',process.env.PORT || 4000);
app.set("port", PORT); 
app.set('views', path.join(__dirname, 'views'));
// config view engine
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  });
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
//Parametros de la foto
var options = { 
    width: 1280,
    height: 720,
    quality: 100,
    delay: 1,
    saveShots: true,
    output: "jpeg",
    device: true, 
    callbackReturn: "location"
};
//Middlewares ----
//--Cada que lleguen datos de un formulario vamos a pasar datos a formato json para manipularlos
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename: (req, file, cb, filename) => {  //cb callback
    path.extname(file.originalname )
      cb(null, uuidv4() + path.extname(file.originalname) );  
  }
});
//app.use(multer({  storage: storage}).array('myImages',3));
app.use(multer({  storage: storage}).single('rostro'));

  

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
  });

//Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(inquilinosRoutes);
app.use(visitantesRoutes);
app.use(trabajadoresRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => {
    return res.status(404).render("404");
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", {
      error,
    });
  });

export default app;
