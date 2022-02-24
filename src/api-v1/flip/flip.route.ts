import { Router } from "express";
import Function from "../../helpers/functions";
import Controller from "./flip.controller";

const flip: Router = Router();
const controller = new Controller();
const helper = new Function();

// Retrieve all Users
flip.route("/").get(helper.getBalance).put(controller.result);

export default flip;
