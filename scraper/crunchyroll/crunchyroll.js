import axios from "axios";

const base = "https://api.kamyroll.tech";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
// const headerOption = { "User-Agent": USER_AGENT, "X-Requested-With": "XMLHttpRequest" };

export const fetchSearchCrunchyroll = async ({ list = [], keyw }) => {
    try {
        const accessToken = await (await axios.get("https://raw.githubusercontent.com/MicGlitch/token/main/welp.json"))
            .data
            .access_token;

        const res = await axios.get(base + `/content/v1/search?channel_id=crunchyroll&query=${keyw}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        res.data.items[0].items.forEach((item) => {
            if (item.title.toLowerCase().includes(keyw.toLowerCase())) {
                list.push({
                    animeTitle: item.title,
                    animeId: item.slug_title,
                    animeCrunchyrollId: item.id,
                    animeImg: item.images.poster_tall.reverse()[0].source
                });
            }
        });

        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

export const fetchCrunchyrollEpisodes = async ({ list = [], id }) => {
    try {
        if (!id) return {
            error: true,
            error_message: "Series ID not provided"
        };

        const accessToken = await (await axios.get("https://raw.githubusercontent.com/MicGlitch/token/main/welp.json"))
            .data
            .access_token;

        const res = await axios.get(base + `/content/v1/seasons?channel_id=crunchyroll&id=${id}&locale=en-US`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = res.data.items.filter((season) => !season.title.toLowerCase().includes("dub"))
            .map((anime) => anime.episodes)
            .flat()

        result.map((item) => {
            list.push({
                episodeId: item.id,
                episodeNum: item.episode,
                episodeTitle: item.title,
                episodeSlugTitle: item.slug_title,
                episodeDescription: item.description,
                episodeImg: item.images.thumbnail.reverse()[0].source,
                seriesId: item.series_id,
                seriesTitle: item.series_title,
                seriesSlugTitle: item.series_slug_title,
                seasonId: item.season_id,
                seasonTitle: item.season_title,
                seasonSlugTitle: item.season_slug_title,
                seasonNumber: item.season_number,

            })
        })

        return list;
    } catch (err) {
        return {
            error: true,
            error_message: err
        }
    }
};

export const fetchCrunchyrollSources = async ({ episodeId }) => {
    try {
        if (!episodeId) return {
            error: true,
            error_message: "Episode ID not provided"
        };

        const accessToken = await (await axios.get("https://raw.githubusercontent.com/MicGlitch/token/main/welp.json"))
            .data
            .access_token;

        const res = await axios.get(base + `/videos/v1/streams?channel_id=crunchyroll&id=${episodeId}&type=adaptive_hls&format=vtt`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        let list;

        list = {
            episodeId: res.data.media_id,
            sources: res.data.streams,
            subtitles: res.data.subtitles
        }

        return list;

    } catch (err) {
        return {
            error: true,
            error_message: err
        }
    }
}