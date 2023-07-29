
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=688c9526fa514d12fbc9d66989424c8c";

    getResource = async (url) => {
        let result = await fetch(url);
        if(!result.ok)
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        return await result.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        let res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
        // if(res.data.results[0].description !== "")
        // {
        //     return this._transformCharacter(res.data.results[0]);
        // }
        // else{
        //     res = this.getCharacter(Math.floor(Math.random() * (1011400 - 1011000) + 1011000))
        //     return res;
        // }
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;