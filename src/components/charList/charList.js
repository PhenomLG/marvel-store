import { Component } from "react";
import Spinner from "../spinner/spinner";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component{
    state = {
        chars: [],
        loading: true
    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars()
    }

    onCharsLoaded = (chars) =>{
        this.setState({
            chars,
            loading: false
        });
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

    // формирование массива элементов li
    renderItems = chars => 
    chars.map(item => {
        const imgStyle = MarvelService.getImageStyle(item.thumbnail);

        return (
            <li onMouseEnter={(e) => {this.toggleSelecting(e)}}
                onMouseLeave={(e) => {this.toggleSelecting(e)}}
                onClick={() => this.props.onCharSelected(item.id)}
                key={item.id} 
                className="char__item">
                <img src={item.thumbnail} alt={item.name} style={imgStyle} className="char__img" />
                <div className="char__title">{item.name}</div>
            </li>
    )});

    render(){
        const {chars, loading} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? this.renderItems(chars) : null;
        return (
            <div className="char__list">
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                 <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;