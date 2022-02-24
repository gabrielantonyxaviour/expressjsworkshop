import { Router } from "express";
import Controller from "./player.controller";

const player: Router = Router();
const controller = new Controller();

// Retrieve all Users
player
  .route("/")
  .get(controller.getAllPlayers)
  .post(controller.createPlayer)
  .delete(controller.deletePlayer)
  .put(controller.updateBalance);
player
  .route("/:player_id")
  .get(controller.getPlayer)
  .put(controller.updatePlayer);
export default player;
