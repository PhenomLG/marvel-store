import { Component } from "react";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/skeleton";

import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";



class CharInfo extends Component{
    state = {
        char: null,
        loading: false,
        error: false,
    }
    marvelService = new MarvelService();

    updateChar = () => {
        const {charId} = this.props;
        if(!charId)
            return;
        
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);  

    }

    onCharLoaded = (char) => { 
        this.setState(
            {
                char, 
                loading: false
            });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState(
            {
                loading: false,
                error: true,
            });
    }

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId)
            this.updateChar();
    }

    render(){
        const {char, loading, error} = this.state;

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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = MarvelService.getImageStyle(thumbnail);
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