import axios from 'axios';
import CryptoJS from 'crypto-js';

const decryptKeyLink = "https://raw.githubusercontent.com/consumet/rapidclown/main/key.txt";

export const scrapeSource = async (serverId) => {
    const res = await axios.get(`https://zoro.to//ajax/v2/episode/sources?id=${serverId}`)
    const rapidLink = res.data.link;

    const rapidId = rapidLink?.split("/").pop().split("?")[0];
    const rapidAjax = await axios.get(`https://rapid-cloud.co/ajax/embed-6/getSources?id=${rapidId}`);

    const sources = rapidAjax.data.sources;
    const decryptKey = await (await axios.get(decryptKeyLink)).data;

    const source = CryptoJS.AES.decrypt(sources, decryptKey).toString(CryptoJS.enc.Utf8);

    return {
        sources: JSON.parse(source),
        tracks: rapidAjax.data.tracks
    }
}