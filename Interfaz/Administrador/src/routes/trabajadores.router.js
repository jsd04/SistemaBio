import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import {
    renderTrabajadorForm,
    createNewTrabajador,
    renderTrabajadores,
    renderEditForm,
    updateTrabajador,
    deleteTrabajador,
    renderTrabajadoresInicial,
    searchTrabajadores,
  } from "../controllers/trabajadores.controller.js";

const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

router.get("/trabajadores/add", renderTrabajadorForm);

router.post("/trabajadores/new-trabajador", createNewTrabajador);

router.get("/trabajadores/trabajadores_inicial", renderTrabajadoresInicial);

// Get All Trabajador
router.get("/trabajadores", renderTrabajadores);

// Edit Trabajador
router.get("/trabajadores/edit/:id", renderEditForm);

// Search Trabajador
router.get("/trabajadores/search-trabajadores",searchTrabajadores);

router.put("/trabajadores/edit-trabajador/:id", updateTrabajador);

// Delete Trabajador
router.delete("/trabajadores/delete/:id", deleteTrabajador);
export default router;
