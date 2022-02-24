import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import Function from "../../helpers/functions";

const prisma = new PrismaClient();
const helper = new Function();
export default class FlipController {
  public result = async (req: Request, res: Response) => {
    const { player_id, result, bet, balance } = req.body;
    if (bet <= balance) {
      let final_balance;
      let won;
      if (result == "W") {
        won = bet;
        final_balance = balance + bet;
      } else {
        won = -bet;
        final_balance = balance - bet;
      }
      const player = await prisma.player.update({
        where: {
          player_id,
        },
        data: {
          balance: final_balance,
        },
      });
      const flip = await prisma.flip.create({
        data: {
          bet,
          result,
          won,
          player_id,
          flipped_at: Date(),
        },
      });
      res.status(200).send({
        success: "true",
        player,
        flip,
      });
    } else {
      res.status(200).send({
        success: "false",
        message: "Insufficient balance",
      });
    }
  };
}
