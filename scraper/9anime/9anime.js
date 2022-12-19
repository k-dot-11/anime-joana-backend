import axios from "axios";
import { load } from 'cheerio';

const nineanimeBase = "https://9anime.gs";
const nineanimeAjax = "https://9anime.gs/ajax";
const decipherKey = "hlPeNwkncH0fq9so";

//Importing functions from helper utils
import {
    ciphered_key,
    decrypt_url
} from '../../helper/utils.js';

import {
    extractFilemoon
} from '../../helper/filemoon.js';

export const fetchSearch9anime = async ({ keyw, list = [] }) => {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        };

        const res = await axios.get(`${nineanimeAjax}/anime/search?keyword=${encodeURIComponent(keyw)}`);

        const $ = load(res.data.result.html);

        $('div.items > a.item').each((i, el) => {
            list.push({
                animeId: $(el).attr("href").split("/watch/")[1],
                animeTitle: $(el).find('div.info > div.name').text(),
                animeImg: $(el).find('div.poster > span > img').attr('src'),
                animeUrl: `${nineanimeBase}${$(el).attr("href")}`,
                score: $(el).find('div.meta > span.text-gray2').text().trim()
            })
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

export const fetch9animeAnimeInfo = async ({ animeId, list = {} }) => {
    try {
        if (!animeId) return {
            error: true,
            error_message: "No animeId provided"
        };

        const res = await axios.get(`${nineanimeBase}/watch/${animeId}`);
        const $ = load(res.data);

        let genre = [];
        $('div.bmeta > div.meta:nth-child(1) > div > span').last().find('a').each((i, el) => {
            genre.push($(el).text());
        });

        const id = $('#watch-main').attr('data-id');

        const episodeListAjax = await axios.get(`${nineanimeAjax}/episode/list/${id}&vrf=${vrfGen(animeId)}`);
        console.log(episodeListAjax.data)
        const $$ = load(episodeListAjax.data.result);

        let episodes = [];
        $$('div.episodes > ul > li > a').each((i, el) => {
            episodes.push({
                episodeId: $(el).attr("data-ids").split(",")[0],
                epNum: $(el).attr('data-num'),
                episodeTitle: $(el).find('span.d-title').text(),
                isFiller: $(el).hasClass('filler')
            })
        })


        list = {
            animeId,
            animeTitle: $('#w-info > div.binfo > div.info > h1.title').text(),
            animeImg: $('#w-info > div.binfo > div.poster > span > img').attr('src'),
            synopsis: $('#w-info > div.binfo > div.info > div.synopsis > div.shorting > div.content').text().trim(),
            genre: genre,
            totalEpisodes: $$('div.episodes > ul > li').length,
            episodes: episodes
        };

        return list;

    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

export const fetch9animeEpisodeSources = async ({ episodeId, list = [] }) => {
    try {
        if (!episodeId) return {
            error: true,
            error_message: "No episodeId provided"
        };

        const res = await axios.get(`${nineanimeAjax}/server/list/${episodeId}`);
        const $ = load(res.data.result);

        let dataLinkId;

        $('div.servers > div.type > ul > li').each((i, el) => {
            if ($(el).text().toLowerCase() === "filemoon") {
                dataLinkId = $(el).attr('data-link-id')
            }
        });

        const serverEmbedLinkAjax = await axios.get(`${nineanimeAjax}/server/${dataLinkId}`);

        const embedLink = decodeURIComponent(ciphered_key(decrypt_url(serverEmbedLinkAjax.data.result.url), decipherKey));
        const sourcesI = await extractFilemoon(embedLink);

        const sourceUrl = new URL(sourcesI);

        return {
            sources: sourceUrl.href
        };
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};