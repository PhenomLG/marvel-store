import { Component } from "react";
import Spinner from "../spinner/spinner";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component{
    state = {
        chars: [],
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false, // Отвечает за отсуствие новых пперсонажей при загрузке

    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
        window.addEventListener('scroll', this.onEndOfPage);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.onEndOfPage);
    }

    onEndOfPage = () => {
        // остаток до нижней границы документа
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        // если пользователь прокрутил достаточно далеко (< 100px до конца)
        if (!this.state.newItemLoading && windowRelativeBottom < document.documentElement.clientHeight + 100) 
            this.onRequest(this.state.offset);    
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(chars => {
                this.onCharsLoaded(chars);
            });
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true})
    }

    onCharsLoaded = (newChars) =>{
        let ended = false;
        if(newChars.length < 9)
            ended = true;
        
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onPointed = (e) => {
        let el = e.target.tagName !== "LI" ? e.target.closest('li') : e.target;
        
        switch(e.type){
            case "mouseenter":
                el.classList.add("char__item_pointed");
                break;
            case "mouseleave":
                el.classList.remove("char__item_pointed");
                break;
            default:
        }
    }

    itemRefs = []
    setRefs = (ref) => {
        this.itemRefs.push(ref);
    }

    onCharSelected = (i) => {
        this.itemRefs.forEach(item => item.classList.remove("char__item_selected"));
        this.itemRefs[i].classList.add("char__item_selected");
        this.itemRefs[i].focus();
        console.log(this.itemRefs[i]);
    }



    // формирование массива элементов li
    renderItems = chars => 
    chars.map((item, i) => {
        const imgStyle = MarvelService.getImageStyle(item.thumbnail);

        return (
            <li 
                ref={this.setRefs}
                tabIndex={0}
                onMouseEnter={(e) => {this.onPointed(e)}}
                onMouseLeave={(e) => {this.onPointed(e)}}
                onClick={() => 
                    {
                        this.props.onCharSelected(item.id);
                        this.onCharSelected(i);
                    }}
                onKeyDown={(e) => {
                    if(e.code === " " || e.code === "Enter")
                    {   
                        this.props.onCharSelected(item.id);
                        this.onCharSelected(i);
                    }

                }}
                key={item.id} 
                className="char__item">
                <img src={item.thumbnail} alt={item.name} style={imgStyle} className="char__img" />
                <div className="char__title">{item.name}</div>
            </li>
    )});

    render(){
        const {chars, loading, newItemLoading, offset, charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? this.renderItems(chars) : null;
        return (
            <div className="char__list">
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                 <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;