
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=688c9526fa514d12fbc9d66989424c8c";
    _baseOffset = 210;


    getResource = async (url) => {
        let result = await fetch(url);
        if(!result.ok)
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        return await result.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
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
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }


    static getImageStyle = (imgPath) => {
        if(imgPath === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
            return {objectFit: "unset"}
        return {objectFit: "cover"};
    }


}

export default MarvelService;