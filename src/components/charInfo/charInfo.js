import { useState, useEffect } from "react";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/skeleton";

import "./charInfo.scss";
import useMarvelService from "../../services/MarvelService";
import Utils from "../../services/Utils";



const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const updateChar = () => {

        const {charId} = props;
        if(!charId)
            return;
        
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => { 
        setChar(char);
    }

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const skeleton =  char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && char ? <View char={char}/> : null

    return(
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = Utils.getImageStyle(thumbnail);
    return (
        <>
            <div className="char__card">
                <img style={imgStyle} src={thumbnail} alt={name} />
                <div>
                    <div className="char__name">{name}</div>
                    <div className="char__btns">
                        <a className='button button__main' href={homepage}>
                            <div className="inner">HOMEPAGE</div>
                        </a>
                        <a className="button button__secondary" href={wiki}>
                            <div className="inner">WIKI</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {renderComics(comics, 10)}
            </ul>
        </>
    )
}

const renderComics = (comics, limit) => {
    let content = [];

    if(limit > comics.length)
        limit = comics.length;
    
    if(limit === 0)
        return <li className="char__comics-item">Этого персонажа пока еще нет в комиксах</li>

    for(let i = 0; i < limit; i++){
        content.push(<li key={i} className="char__comics-item">{comics[i].name}</li>)
    }
    return content;
}

export default CharInfo;