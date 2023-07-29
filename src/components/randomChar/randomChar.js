import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/spinner';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
    }
    marvelService = new MarvelService();
    onCharLoaded = (char) => { 
        this.setState(
            {
                char, 
                loading: false
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
        const {char, loading} = this.state;
        return(
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
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
        description = "Данных об этом персонаже пока что нет.";
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