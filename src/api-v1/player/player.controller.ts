import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class PlayerController {
  public getAllPlayers = async (req: Request, res: Response) => {
    const players = await prisma.player.findMany({
      include: {
        flips: true,
        rolls: true,
      },
    });
    res.status(200).send({
      success: "true",
      players,
    });
  };

  public getPlayer = async (req: Request, res: Response) => {
    const player_id = parseInt(req.params.player_id);
    const player = await prisma.player.findFirst({
      where: {
        player_id,
      },
      include: {
        flips: true,
        rolls: true,
      },
    });
    if (player == null) {
      res.status(200).send({
        success: "false",
        message: "Player not found",
      });
    } else {
      res.status(200).send({
        success: "true",
        player,
      });
    }
  };

  public createPlayer = async (req: Request, res: Response) => {
    const { name, bio, email } = req.body;
    let player;
    try {
      player = await prisma.player.create({
        data: {
          name: name,
          bio: bio,
          email: email,
          joined_at: Date(),
          balance: 10000,
        },
      });
      res.status(200).send({
        success: "true",
        player,
      });
    } catch (err) {
      res.status(200).send({
        success: "false",
        message: err.toString(),
      });
    }
  };

  public updatePlayer = async (req: Request, res: Response) => {
    const { name, email, bio, balance } = req.body;
    const player_id = parseInt(req.params.player_id);
    try {
      const player = await prisma.player.update({
        where: {
          player_id: player_id,
        },
        data: { name, email, balance, bio },
      });
      res.status(200).send({
        success: true,
        updatedPlayer: player,
      });
    } catch (err) {
      res.status(200).send({
        success: "false",
        message: "An unknown error occured",
      });
    }
  };

  public updateBalance = async (req: Request, res: Response) => {
    const { update, player_id } = req.body;
    if (player_id == null) {
      const players = await prisma.player.updateMany({
        data: {
          balance: {
            increment: update,
          },
        },
      });
      res.status(200).send({
        success: true,
        updatedPlayers: players,
      });
    } else {
      try {
        const player = await prisma.player.update({
          where: {
            player_id,
          },
          data: {
            balance: {
              increment: update,
            },
          },
        });
        res.status(200).send({
          success: true,
          updatedPlayer: player,
        });
      } catch (err) {
        res.status(200).send({
          success: "false",
          message: "The player is unavailable",
        });
      }
    }
  };

  public deletePlayer = async (req: Request, res: Response) => {
    const { player_id } = req.body;
    try {
      const player = await prisma.player.delete({
        where: {
          player_id,
        },
      });
      res.status(200).send({
        success: "true",
        deletedPlayer: player,
      });
    } catch (err) {
      res.status(200).send({
        success: "false",
        message: "The player is unavailable",
      });
    }
  };
}
