import { addAppointment, deleteAppointment, getAppointments, updateAppointment } from "../controllers/appointments.controller.js";

import { Router } from "express";

const router = Router();

router.get('/', getAppointments);
router.post('/', addAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;