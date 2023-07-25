import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';


function App() {
  return (
    <div className="app">
        <AppHeader/>
        <main>
            <RandomChar/>
            <div className="char__content">
              <CharInfo/>
              <CharList/>
            </div>
        </main>
    </div>
  );
}

export default App;
