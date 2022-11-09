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
