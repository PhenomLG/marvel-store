import { useState } from 'react';

import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import decoration from '../../resources/img/vision.png';


const App = () => {

  const [selectedChar, setChar] = useState(null);
  const onCharSelected = (id) => {
    setChar(id);
  }

  return (
    <div className="app">
      <AppHeader/>
        <main>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId = {selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    </div>
  ); 
}

export default App;
