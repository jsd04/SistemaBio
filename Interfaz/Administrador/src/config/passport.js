import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import Administrador from "../models/Administrador.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const admin = await Administrador.findOne({ email: email });

      if (!admin) {
        return done(null, false, { message: "Administrador no encontrado." });
      } 
      else {
        const Match = await admin.matchPassword(password);
        if (!Match){
          return done(null, false, { message: "Password incorrecto." });
        }
        else{
          return done(null, admin,{message: "Ya accediste"}); 
        }
      }

      // Match Password's User
     
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Administrador.findById(id, (err, admin) => {
    done(err, admin);
  });
});
