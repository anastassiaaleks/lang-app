import './App.css';
import {useCookies} from 'react-cookie';
import {useEffect, useState} from 'react';
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import Library from './Components/Library/Library';
import Learn from './Components/Learn/Learn';
import styles from './App.module.css';
import Games from './Components/Games/Games';
import Store from './context';
import games from './Components/Games/index'

function App() {
  const [library, setLibrary]=useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex]=useState(0)
  const [correctWords, setCorrectWords]=useState(0)
  const [errortWords, setErrorWords]=useState(0)
  const [playWords, setPlayWords]=useState(library.slice(-10))
  const [cookie, setCookie] = useCookies(['points'])
  const [points, setPoints] = useState(+cookie.points || 0)

  console.log(cookie)
  useEffect(()=>{
    if(correctWords) {
      setPoints(points + 1)
      setCookie('points', points + 1)
    }
  },[correctWords])

  const progressBarWidth={
    width: `${(100 / library.slice(-10).length) * (wordIndex+1)}vw`
  }
  const speak=(word)=>{
    const speakInstance=new SpeechSynthesisUtterance(word)
    speakInstance.voice=speechSynthesis.getVoices()[3]
    speechSynthesis.speak(speakInstance)
  }
  return (
    <BrowserRouter>
    <Store.Provider value={{correctWords, setCorrectWords, errortWords, setErrorWords, playWords}}>
      <Header />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard points={points} />
        </Route>
        <Route path='/games'>
          <Games />
        </Route>

        <Route path='/game'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <nav className={styles.gameNav}>
            <NavLink className={styles.btnBack} to={'/games'}></NavLink>
              <ul className={styles.results}>
                <li>Errors: {errortWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
          </nav>

          <section className={styles.gameContainer}>
            {games.map((game, index)=> <Route path={`/game/${game.path}`}>
              <game.component setWordIndex={setWordIndex} wordIndex={wordIndex} speak={speak}/>
            </Route>)}
          </section>
        </Route>

        <Route path='/library'>
          <Library library={library} setLibrary={setLibrary}/>
        </Route>
        <Route path='/learn'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <Learn speak={speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex}/>
          <div onClick={()=>{
            if(wordIndex===library.length-1){
              setWordIndex(0)
            } else {
              setWordIndex(wordIndex+1)}
            }
          } className={styles.btnNext}></div>
        </Route>
      </Switch>
    </Store.Provider>
    </BrowserRouter>
  );
}

export default App;
