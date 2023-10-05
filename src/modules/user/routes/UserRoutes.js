import {Router} from "express";

import UserController from "../controller/UserController.js";
import checkToken from "../../../config/auth/CheckToken.js";

const router = Router();

router.post('/api/user/:auth', UserController.getAccessToken);
router.get(checkToken());
router.get('/api/user/:email', UserController.findByEmail);

export default router;