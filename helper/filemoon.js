import axios from "axios";
import { load } from 'cheerio';

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36";

export const extractFilemoon = async (embedUrl) => {
    let sources;

    const res = await axios.get(embedUrl);
    const $ = load(res.data);

    try {
        const evalFunc = $('script').last().text().split("return p")
        evalFunc[0] += "sources=p;return p"
        const finalRes = evalFunc.join(" ");

        eval(finalRes)
    } catch (err) { }

    const sourceLink = sources.split("{file:\"")[1].split("\"}],image")[0]

    return sourceLink;
}