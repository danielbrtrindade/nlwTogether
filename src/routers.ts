import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", ensureAdmin, createUserController.handle)
router.post("/tags", createTagController.handle)

export { router }