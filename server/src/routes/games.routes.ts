import { Router } from 'express';
import { convertToHour } from '../utils/convertToHour';
import { convertToMinute } from '../utils/convertToMinute';
import { prisma } from './index';

const games = Router();

games.get('/games', async (_, res) => {
    const listGames = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.status(200).json(listGames);
});


games.get('/games/:id/ads', async (req, res) => {
    const gameAds = await prisma.ad.findMany({
        select: {
            gameId: true,
            hourEnd: true,
            hourStart: true,
            id: true,
            name: true,
            useVoiceChannel: true,
            weekDays: true,
            yearsPlaying: true
        },

        where: {
            gameId: req.params.id
        },

        orderBy: {
            createdAt: 'desc'
        }
    });

    return res.status(200).json(gameAds.map(ad => ({
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertToHour(ad.hourStart),
        hourEnd: convertToHour(ad.hourEnd)
    })));
});


games.post('/games/:id/ads', async (req, res) => {
    const body = req.body;

    const result = await prisma.ad.create({
        data: {
            gameId: req.params.id,
            discord: body.discord,
            hourEnd: convertToMinute(body.hourEnd),
            hourStart: convertToMinute(body.hourStart),
            name: body.name,
            weekDays: body.weekDays.join(','),
            yearsPlaying: body.yearsPlaying,
            useVoiceChannel: body.useVoiceChannel
        }
    });

    return res.status(201).json(result);
});


export { games };