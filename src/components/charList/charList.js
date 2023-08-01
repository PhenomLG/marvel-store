import { Component, Fragment } from "react";
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
            this.onCharsLoaded(chars);
        });
    }


    toggleSelecting = (e) => {
        let el = e.target;
        if(e.target.tagName !== "LI")
            el = e.target.parentNode;
        
        switch(e.type){
            case "mouseenter":
                el.classList.add("char__item_selected");
                break;
            case "mouseleave":
                el.classList.remove("char__item_selected");
                break;
            default:
        }
    }

    render(){
        const getChars = chars => 
            chars.map(item => {
                const imgStyle = MarvelService.getImageStyle(item.thumbnail);
                return (
                    <li onMouseEnter={(e) => {this.toggleSelecting(e)}}
                        onMouseLeave={(e) => {this.toggleSelecting(e)}}
                        key={item.id} 
                        className="char__item">
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