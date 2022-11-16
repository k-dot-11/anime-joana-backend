import express from 'express';

const app = express();
import cors from 'cors';

//Importing Global functions & utils
import {
    fetchPopular,
    fetchAnimeByGenre
} from './scraper/scrape.js';

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json())

import gogoRoutes from './Routes/Gogoanime.js';
import animixRoutes from './Routes/Animixplay.js';
import zoroRoutes from './Routes/Zoro.js';
import crunchyrollRoutes from './Routes/Crunchyroll.js';

app.use('/gogoanime', gogoRoutes);
app.use('/animix', animixRoutes);
app.use('/zoro', zoroRoutes);
app.use('/crunchyroll', crunchyrollRoutes);


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to AnimeAPI!')
});

app.get('/popular', async (req, res) => {
    const type = req.query.type;

    const data = await fetchPopular({ type });
    res.json(data).status(200);
});

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre;

    const data = await fetchAnimeByGenre({ genre });
    res.json(data).status(200)
});

//Start the web-server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
});
