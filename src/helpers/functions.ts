import { Request, response, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class Functions {
  public getBalance = async (req: Request, res: Response) => {
    const { player_id } = req.body;
    const balance = await prisma.player.findFirst({
      where: {
        player_id,
      },
      select: {
        balance: true,
      },
    });
    res.status(200).send({
      success: "true",
      balance,
    });
  };
}
