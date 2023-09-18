import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from "../../services/MarvelService";
import Utils from "../../services/Utils";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const  { loading, error, getCharacter, clearError} = useMarvelService();

    const onCharLoaded = (char) => { 
        setChar(char);
    }

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null
    return(
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                    <p className="randomchar__title">Random character for today!<br/>Do you want to get to know him better?</p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img className='randomchar__decoration' src={mjolnir} alt="mjolnir" />   
            </div>
        </div>
    ); 
}

// Отделяем View от логики
const View = ({char}) => {
    const {name, thumbnail, homepage, wiki} = char;
    let {description} = char;
    const imgStyle = Utils.getImageStyle(thumbnail);
    if(description === ""){
        description = "Данные об этом персонаже еще не были добавлены.";
    }

    return (
    <div className="randomchar__block">
        <img className="randomchar__img" style={imgStyle} src={thumbnail} alt="thor"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
                <a className='button button__main' href={homepage}>
                    <div className="inner">HOMEPAGE</div>
                </a>
                <a className="button button__secondary" href={wiki}>
                    <div className="inner">WIKI</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;