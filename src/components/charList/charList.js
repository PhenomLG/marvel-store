import { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component{
    state = {
        chars: [] 
    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars()
    }

    onCharsLoaded = (chars) =>{
        this.setState({chars});
    }

    updateChars = () => {
        this.marvelService.getAllCharacters()
        .then(chars => {
            const charsWithId = chars.map((char, index) => {
                return {...char, id: index};
            })
            this.onCharsLoaded(charsWithId);
        });
    }

    render(){
        const getChars = chars => 
            chars.map(item => {
                const imgStyle = MarvelService.getImageStyle(item.thumbnail);
                return (
                <li key={item.id} className="char__item">
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} className="char__img" />
                    <div className="char__title">{item.name}</div>
                </li>
            )})
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {getChars(this.state.chars)}
                </ul>
                 <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;