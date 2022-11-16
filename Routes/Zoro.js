import express from "express";
const router = express.Router();

import {
    fetchSearchZoro,
    fetchZoroAnimeInfo,
    fetchZoroEpisodeSource
} from "../scraper/scrape.js";

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;
    const page = req.query.page;

    const data = await fetchSearchZoro({ keyw: keyw, page: page });
    res.json(data).status(200);
});

router.get('/info/:zoroId', async (req, res) => {
    const zoroId = req.params.zoroId;

    const data = await fetchZoroAnimeInfo({ zoroId: zoroId });
    res.json(data).status(200)
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;
    const type = req.query.type;

    const data = await fetchZoroEpisodeSource({ episodeId, type });
    res.json(data).status(200);
});

export default router;