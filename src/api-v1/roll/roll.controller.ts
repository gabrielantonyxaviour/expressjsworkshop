import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class RollController {
  public result = async (req: Request, res: Response) => {
    const { player_id, bet, balance, rolls_won } = req.body;
    let result;
    if (rolls_won < 2) {
      result = "L";
    } else {
      result = "W";
    }
    if (bet <= balance) {
      let final_balance;
      let won;
      if (rolls_won == 2) {
        won = bet;
        final_balance = balance + bet;
      } else if (rolls_won == 3) {
        won = bet + bet + bet;
        final_balance = balance + bet + bet + bet;
      } else if (rolls_won == 0) {
        final_balance = balance - bet;
        won = -bet;
      } else {
        won = 0;
      }
      const player = await prisma.player.update({
        where: {
          player_id,
        },
        data: {
          balance: final_balance,
        },
      });

      const roll = await prisma.roll.create({
        data: {
          bet,
          result,
          won,
          player_id,
          rolled_at: Date(),
        },
      });
      res.status(200).send({
        success: "true",
        player,
        roll,
      });
    } else {
      res.status(200).send({
        success: "false",
        message: "Cannot bet with an amount greater than balance",
      });
    }
  };
}
