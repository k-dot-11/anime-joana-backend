<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=AnimeAPI&fontSize=90&animation=fadeIn&fontAlignY=38&desc=anime%20streaming%20and%20discovery%20api&descAlignY=51&descAlign=62" align="center" style="width: 100%" />
</div>  
  
### <div align="center">AnimeAPI is a anime streaming and discovery api built using NodeJS and express that scrapes Gogoanime and Animixplay to return data</div>  


<p align="center">
    <a href="https://github.com/IGRohan/AnimeAPI">
      <img src="https://img.shields.io/github/license/IGRohan/AnimeAPI?style=flat-square" alt="Github license">
    </a>
     <a href="https://github.com/IGRohan/AnimeAPI">
      <img src="https://img.shields.io/github/package-json/v/IGRohan/AnimeAPI?style=flat-square" alt="GitHub package.json version">
    </a>
</p>



<br/>

## Navigation
- [Navigation](#navigation)
- [Installation](#installation)
- [Available Routes](#available-routes)
  - [Global Routes](#global-routes)
    - [- Get popular anime](#--get-popular-anime)
    - [- Get anime by genre](#--get-anime-by-genre)
  - [Gogoanime Routes](#gogoanime-routes)
  - [Animixplay Routes](#animixplay-routes)
  - [Zoro Routes](#zoro-routes)
  - [Crunchyroll Routes](#crunchyroll-routes)
- [Contributing](#contributing)

## Installation
Execute the following commands in your terminal:

```sh
git clone https://github.com/IGRohan/AnimeAPI.git
cd AnimeAPI
npm install
npm start
```

## Available Routes

You may test out these routes by going to [AnimeAPI demo](https://animeapi-demo.herokuapp.com/), but do note that this might be very slow and it is recommended to self host to get the fastest response time possible.

### Global Routes

Routes to get simple stuff like popular anime, etc.

#### - Get popular anime

```http
  GET /popular
```

| Parameter | Type  | Description                                                                         |
| :-------- | :---- | :---------------------------------------------------------------------------------- |
| `type`    | `int` | **Optional**. Type 1 (default): Weekly most viewed. Type 2: Most viewed of all time |


Example:

```js
axios.get('/popular')
.then(response => response.data)
```

Output

```json
[
    {
        "animeTitle": "One Piece",
        "mal_id": "21",
        "animeImg": "https://cachecow.eu/i/73059c39fee46b7c378a3aa0bdd9b6a2.jpg",
        "views": "2,468,790",
        "score": 8.65
    },
    {...},
    {...}
]
```

#### - Get anime by genre

```http
  GET /genre/${genre}
```

| Parameter | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `:genre`  | `string` | **Required**. Genre. Automatically sorts results by popularity |


Example:

```js
axios.get('/genre/action')
.then(response => response.data)
```

Output

```json
[
    {
        "animeTitle": "Demon Slayer: Kimetsu no Yaiba Entertainment District Arc",
        "animeId": "kimetsu-no-yaiba-yuukaku-hen",
        "animeImg": "https://cachecow.eu/i/79cccf7f5390f397ace739a0aec23b04.jpg",
        "animeSeason": "Winter 2022 Anime ",
        "score": 8.86
    },
    {...}
]
```

### Gogoanime Routes

Routes that scrape information from [Gogoanime](https://gogoanime.fi/)

<h4><details><summary>Search Anime using Gogoanime</summary>

```http
GET /gogoanime/search?keyw=${keyw}&page=${page}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `keyw`    | `string` | **Required**. Keyword used to search for anime |
| `page`    | `int`    | **Optional**. Page number                      |


Example:

```js
axios.get('/gogoanime/search?keyw=jujutsu')
.then(response => response.data)
```

Output

```json
[
    {
        "animeId": "jujutsu-kaisen-tv",
        "animeTitle": "Jujutsu Kaisen (TV)",
        "animeUrl": "https://gogoanime.lu///category/jujutsu-kaisen-tv",
        "animeImg": "https://gogocdn.net/cover/jujutsu-kaisen-tv.png",
        "status": "Released: 2020"
    },
    {...},
    {...}
]
```
</details>
<br>
<details><summary>Get latest released episodes from Gogoanime</summary>

```http
GET /gogoanime/recent-episodes
```

| Parameter | Type  | Description                                                                                                            |
| :-------- | :---- | :--------------------------------------------------------------------------------------------------------------------- |
| `type`    | `int` | **Optional**. Type 1 (default): Japanese Audio/Eng subs. Type 2: English Audio/No Subs. Type 3: Chinese Audio/Eng subs |
| `page`    | `int` | **Optional**. Page number                                                                                              |


Example:

```js
axios.get('/gogoanime/recent-episodes')
.then(response => response.data)
```

Output

```json
[
    {
        "episodeId": "made-in-abyss-retsujitsu-no-ougonkyou-episode-6",
        "animeTitle": "Made in Abyss: Retsujitsu no Ougonkyou",
        "episodeNum": "6",
        "subOrDub": "SUB",
        "animeImg": "https://gogocdn.net/cover/made-in-abyss-retsujitsu-no-ougonkyou.png",
        "episodeUrl": "https://gogoanime.lu///made-in-abyss-retsujitsu-no-ougonkyou-episode-6"
    },
    {...}
]
```
</details>
<br>
<details><summary>Get anime info from Gogoanime</summary>

```http
GET /gogoanime/info/${animeId}
```

| Parameter  | Type     | Description                                           |
| :--------- | :------- | :---------------------------------------------------- |
| `:animeId` | `string` | **Required**. animeId (received from other api calls) |


Example:

```js
axios.get('/gogoanime/info/one-piece')
.then(response => response.data)
```

Output

```json
[
    {
        "animeTitle": "One Piece",
        "type": "TV Series",
        "synopsis": "...",
        "animeImg": "https://gogocdn.net/images/anime/One-piece.jpg",
        "releaseDate": "1999",
        "status": "Ongoing",
        "genres": [
            "Action",
            "Adventure",
            "Comedy",
            "Fantasy",
            "Shounen",
            "Super Power"
        ],
        "otherNames": "",
        "eptotal": "1026",
        "episodes": [
            {
            "episodeId": "one-piece-episode-1026",
            "epNum": "1026",
            "episodeUrl": "https://gogoanime.lu//one-piece-episode-1026"
            },
            {...}
        ]
]
```
</details>
<br>
<details><summary>Get streaming URLs from Gogoanime</summary>

```http
GET /gogoanime/watch/${episodeId}
```

| Parameter    | Type     | Description                                                       |
| :----------- | :------- | :---------------------------------------------------------------- |
| `:episodeId` | `string` | **Required**. episodeId received from gogoanime anime info route. |


Example:

```js
axios.get('/gogoanime/watch/one-piece-episode-1015')
.then(response => response.data)
```

Output

```json
{
    "Referer": "https://goload.pro/streaming.php?id=MTg1MDA5&title=One+Piece+Episode+1015&typesub=SUB",
    "sources": [
        {
        "file": "https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/6312749785001/2862bdc3-e420-4d02-81ec-2edb4feb0cc3/6s/master.m3u8?fastly_token=NjJkZGRjNmRfZGY2MmNlYTcwMmJmZmVhMzYxZTc5ZDIxNDk4MzBhMzc3ZmE4ZGIzZmE0OGE5MTRkYzU1MDFmMzY3YTc2YTNlMg%3D%3D",
        "label": "auto P",
        "type": "mp4"
        }
    ],
    "sources_bk": [
        {
        "file": "https://wwwx20.gogocdn.stream/hls/0b594d900f47daabc194844092384914/ep.1015.1657688386.m3u8",
        "label": "hls P",
        "type": "mp4"
        }
    ]
}
```
</details>
<br>

### Animixplay Routes

Routes that scrape information from [Animixplay](https://animixplay.to)

<h4><details><summary>Search Anime using Animixplay</summary>

```http
GET /animix/search?keyw=${keyw}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `keyw`    | `string` | **Required**. Keyword used to search for anime |


Example:

```js
axios.get('/animix/search?keyw=jujutsu')
.then(response => response.data)
```

Output

```json
[
    {
        "animeTitle": "Jujutsu Kaisen (TV)",
        "animeId": "jujutsu-kaisen-tv",
        "animeImg": "https://cachecow.eu/i/7802b28c9b08401ccf503d4ebf6c5004.jpg"
    },
    {...},
    {...}
]
```
</details>
<br>
<details><summary>Get latest released episodes from Animixplay</summary>

```http
GET /animix/recent-episodes
```                                                                                            

Example:

```js
axios.get('/animix/recent-episodes')
.then(response => response.data)
```

Output

```json
[
    {
        "episodeTitle": "Call of the Night",
        "animeId": "yofukashi-no-uta",
        "releaseTimeUnix": 1661449506,
        "mal_id": "50346",
        "episodeNum": "8",
        "episodes": "8/13",
        "animeImg": "https://cdn.animixplay.to/i/c3668266da90c7b66bc52152593e50bb.jpg"
    },
    {...}
]
```
</details>
<br>
<details><summary>Get all anime</summary>

```http
GET /animix/all
```

Example: 

```js
axios.get('/animix/all')
.then(response => response.data)
```

Output

```json
[
    {
        "animeTitle": "The Strongest Magic Doctor Mixed City",
        "animeId": "the-strongest-magic-doctor-mixed-city"
    },
    {...}
]
```
</details>
<br>
<details><summary>Get anime info from Animixplay</summary>

```http
  GET /animix/info/${malId}
```

| Parameter | Type  | Description                                                                   |
| :-------- | :---- | :---------------------------------------------------------------------------- |
| `:malId`  | `int` | **Required**. MyAnimeList ID of the anime, also received through some routes. |


Example:

```js
axios.get('/animix/info/21')
.then(response => response.data)
```

Output

```json
{
    "animeTitle": "One Piece",
    "animeId": "one-piece",
    "mal_id": 21,
    "animeImg": "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    "episodes": null,
    "status": "Currently Airing",
    "score": 8.65,
    "synopsis": "...",
    "genres": [
        "Action",
        "Adventure",
        "Fantasy"
    ],
    "studios": [
        "Toei Animation"
    ],
    "gogoAnimeLink": [
        {
        "url": "https://gogoanime.sk/category/one-piece",
        "title": "One Piece"
        },
        {
        "url": "https://gogoanime.sk/category/one-piece-dub",
        "title": "One Piece (Dub)"
        }
    ],
    "animepaheLink": [
        {
        "url": "https://animepahe.com/a/4",
        "title": "One Piece"
    }
    ],
    "zoroLink": [
        {
        "url": "https://zoro.to/one-piece-100",
        "title": "One Piece"
    }
    ]
}
```
</details>
<br>
<details><summary>Get anime episodes from Animix</summary>

```http
GET /animix/episodes/${animeId}
```

| Parameter  | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `:animeId` | `string` | **Required**. animeId (received from other api calls). |


Example:

```js
axios.get('animix/episodes/one-piece')
.then(response => response.data)
```

Output

```json
{
    "animeTitle": "One Piece",
    "mal_id": "21",
    "genres": "Action, Adventure, Fantasy, Shounen",
    "status": "Status : Ongoing",
    "total_episodes": 1026,
    "episodes": [
        {
        "epNum": 1,
        "link": "//goload.pro/streaming.php?id=MzUxOA==&title=One+Piece+Episode+1"
        },
        {
        "epNum": 2,
        "link": "//goload.pro/streaming.php?id=MzUyMQ==&title=One+Piece+Episode+2"
        },
        {...}
    ]
}
```
</details>
<br>
<details><summary>Get streaming URLs from Animixplay</summary>

```http
GET /animix/watch/${episodeId}
```

| Parameter    | Type     | Description                                         |
| :----------- | :------- | :-------------------------------------------------- |
| `:episodeId` | `string` | **Required**. episodeId = {animeId}-episode-{epNum} |


Example:

```js
axios.get('/animix/watch/one-piece-episode-1015')
.then(response => response.data)
```

Output

```json
{
    "animeId": "one-piece",
    "episodeNum": "1015",
    "sources": [
        {
            "file": "https://v.vrv.co/evs3/c925fcce0204d351a1e2c282862c3f2a/assets/66019d5a1dc3ae6644144f8543bffc55_,4449484.mp4,4449485.mp4,4449483.mp4,4449481.mp4,4449482.mp4,.urlset/master.m3u8........",
            "type": "hls"
        }
    ]
}
```
</details>
<br>

### Zoro Routes

### Crunchyroll Routes

## Contributing

Contributions are always welcome!

You can contribute to this project by forking the project, adding
/making changes, and submitting a pull request.

However the best way to contribute would be to suggest new routes
or features and if possible, showing the logic and process behind
it.
