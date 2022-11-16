import express from "express";
const router = express.Router();

import {
    fetchSearchCrunchyroll,
    fetchCrunchyrollEpisodes,
    fetchCrunchyrollSources
} from "../scraper/scrape.js";

router.get('/search', async (req, res) => {
    const keyw = req.query.keyw;

    const data = await fetchSearchCrunchyroll({ keyw: keyw });
    res.json(data).status(200)
});

router.get('/episodes/:id', async (req, res) => {
    const id = req.params.id;

    const data = await fetchCrunchyrollEpisodes({ id });
    res.json(data).status(200)
});

router.get('/watch/:episodeId', async (req, res) => {
    const episodeId = req.params.episodeId;

    const data = await fetchCrunchyrollSources({ episodeId });
    res.json(data).status(200)
});

export default router;