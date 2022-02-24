import { Router } from "express";
import flip from "./flip/flip.route";
import player from "./player/player.route";
import roll from "./roll/roll.route";

const router: Router = Router();

router.use("/players", player);
router.use("/flip", flip);
router.use("/roll", roll);

export default router;
