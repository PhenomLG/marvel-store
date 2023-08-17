import { useState, useEffect, useRef } from "react";
import Spinner from "../spinner/spinner";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";


const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        console.log('Запускаю запрос');
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(chars => {
                onCharsLoaded(chars);
            });
    }

    // const onEndOfPage = () => {
    //     // остаток до нижней границы документа
    //     let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    //     // если пользователь прокрутил достаточно далеко (< 100px до конца)
    //     if (!newItemLoading && windowRelativeBottom < document.documentElement.clientHeight + 100) 
    //         onRequest(offset);    
    // }



    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharsLoaded = (newChars) =>{
        let ended = false;
        if(newChars.length < 9)
            ended = true;

        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);

    }

    const onPointed = (e) => {
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

    const itemRefs = useRef([]);

    const onCharSelected = (i) => {
        itemRefs.current.forEach(item => item.classList.remove("char__item_selected"));
        itemRefs.current[i].classList.add("char__item_selected");
        itemRefs.current[i].focus();
    }

    // формирование массива элементов li
    function renderItems(chars){
        return chars.map((item, i) => {
            const imgStyle = MarvelService.getImageStyle(item.thumbnail);

            return (
                <li 
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    onMouseEnter={(e) => {onPointed(e)}}
                    onMouseLeave={(e) => {onPointed(e)}}
                    onClick={() => 
                        {
                            props.onCharSelected(item.id);
                            onCharSelected(i);
                        }}
                    onKeyDown={(e) => {
                        if(e.code === " " || e.code === "Enter")
                        {   
                            props.onCharSelected(item.id);
                            onCharSelected(i);
                        }

                    }}
                    key={item.id} 
                    className="char__item">
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} className="char__img" />
                    <div className="char__title">{item.name}</div>
                </li>
        )});
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !loading ? renderItems(chars) : null;
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
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

export default CharList;