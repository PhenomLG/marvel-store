import { useHttp} from "../hooks/http.hook";


const useMarvelService  = () => {
    const {loading, request, error, clearError} = useHttp();
    const apiBase = "https://gateway.marvel.com:443/v1/public/";
    const apiKey = "apikey=688c9526fa514d12fbc9d66989424c8c";
    const baseOffset = 210;


    const getAllCharacters = async (offset = baseOffset) => {
        const res = await request(`${apiBase}characters?limit=9&offset=${offset}&${apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        let res = await request(`${apiBase}characters/${id}?${apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
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

    return { loading, error,  getAllCharacters, getCharacter, clearError};
}

export default useMarvelService;