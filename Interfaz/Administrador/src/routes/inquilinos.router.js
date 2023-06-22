import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import {
    renderInquilinoForm,
    createNewInquilino,
    renderInquilinos,
    renderInquilinosInicial,
    searchInquilinos,
    renderEditForm,
    updateInquilino,
    deleteInquilino,
    createNewfacial ,
    facialForm,
  } from "../controllers/inquilinos.controller.js";
  //import { facial} from "../controllers/inquilinos.controller.js";

const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

router.get("/inquilinos/add", renderInquilinoForm);
router.get("/facial", facialForm);
router.post("/inquilinos/new-inquilino", createNewInquilino);
router.post("/new-facial",createNewfacial );

router.get("/inquilinos/inquilinos_inicial_copy", renderInquilinosInicial);

//Search 
router.get("/inquilinos/search-inquilinos", searchInquilinos);

// Get All Inquilinos
router.get("/inquilinos/all-inquilinos", renderInquilinos);

// Edit Inquilinos
router.get("/inquilinos/edit/:id", renderEditForm);

router.put("/inquilinos/edit-inquilino/:id", updateInquilino);

// Delete Inquilinos
router.delete("/inquilinos/delete/:id", deleteInquilino);

export default router;
