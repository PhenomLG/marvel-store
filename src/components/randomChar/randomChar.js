import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService();
    onCharLoaded = (char) => { 
        this.setState(
            {
                char, 
                loading: false
            });
    }

    onError = () => {
        this.setState(
            {
                loading: false,
                error: true,
            });
    }

    constructor(props){
        super(props);
        this.updateChar();
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    //
    render(){
        const {char, loading, error} = this.state;
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
                        <button className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                        <img className='randomchar__decoration' src={mjolnir} alt="mjolnir" />   
                </div>
            </div>
        );
    }
}

// Отделяем View от логики
const View = ({char}) => {
    const {name, thumbnail, homepage, wiki} = char;
    let {description} = char;
    if(description === ""){
        description = "Данные об этом персонаже еще не были добавлены.";
    }

    return (
    <div className="randomchar__block">
        <div className="randomchar__img">
            <img className='randomchar__img' src={thumbnail} alt="thor"/>
        </div>
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