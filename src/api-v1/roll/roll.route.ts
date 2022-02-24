import { Router } from "express";
import Function from "../../helpers/functions";
import Controller from "./roll.controller";

const roll: Router = Router();
const controller = new Controller();
const helper = new Function();

// Retrieve all Users
roll.route("/").get(helper.getBalance).put(controller.result);

export default roll;
