import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import {
    renderVisitanteForm,
    createNewVisitante,
    renderVisitantes,
    renderEditForm,
    updateVisitante,
    deleteVisitante,
    searchVisitantes,
    renderVisitantesInicial,
  } from "../controllers/visitantes.controller.js";

const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

router.get("/visitantes/add", renderVisitanteForm);

router.post("/visitantes/new-visitante", createNewVisitante);

router.get("/visitantes/visitantes_inicial", renderVisitantesInicial);

// Get All Visitante
router.get("/visitantes", renderVisitantes);

// Edit Visitante
router.get("/visitantes/edit/:id", renderEditForm);

// Search visitante
router.get("/visitantes/search-visitantes",searchVisitantes);

router.put("/visitantes/edit-visitante/:id", updateVisitante);

// Delete Visitante
router.delete("/visitantes/delete/:id", deleteVisitante);
export default router;
