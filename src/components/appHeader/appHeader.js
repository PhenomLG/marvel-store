import "./appHeader.scss";

function AppHeader() {
    return(
        <header className="app__header">
            <h1 className="app__title"><span>Marvel</span> information portal</h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#"></a>Comics</li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;