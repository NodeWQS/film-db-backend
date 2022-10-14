import { Router } from "express";
import AuthController from "./auth.service";

const router = Router();
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.post('/validation', AuthController.tokenValidation);

module.exports = router;
