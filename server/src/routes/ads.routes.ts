import { Router } from 'express';
import { prisma } from './index';

const ads = Router();

ads.get('/ads/:id/discord', async (req, res) => {
    const discordUserTag = await prisma.ad.findUniqueOrThrow({
        where: {
            id: req.params.id
        },

        select: {
            discord: true
        }
    });

    return res.status(200).json(discordUserTag);
});

export { ads };