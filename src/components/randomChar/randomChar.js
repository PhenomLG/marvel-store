import './randomChar.scss';
import thor from '../../resources/img/thor.png';
import mjolnir from '../../resources/img/mjolnir.png';



function RandomChar() {
    return(
        <div className="randomchar">
            <div className="randomchar__block">
                <img className='randomchar__img' src={thor} alt="thor"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">THOR</p>
                    <p className="randomchar__descr">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                    <div className="randomchar__btns">
                        <a className='button button__main' href="#">
                            <div className="inner">HOMEPAGE</div>
                        </a>
                        <a className="button button__secondary" href="#">
                            <div className="inner">WIKI</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                    <p className="randomchar__title">Random character for today!<br/>Do you want to get to know him better?</p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main"></button>
                    <img src={mjolnir} alt="mjolnir" />   
            </div>
        </div>
    );
}

export default RandomChar;