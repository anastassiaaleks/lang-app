import React, {useEffect, useState, useMemo, useContext} from 'react'
import * as styles from './AppGames.module.css'
import Store from './../../../context'

const CheckIt =({setWordIndex, wordIndex, speak})=>{

    const data=useContext(Store)
    const randomWords = useMemo(()=> data.playWords.sort(()=>Math.random() - 0.5), [])
    const [currentWords, setCurrentWords]=useState(['random', 'currect', 'random2'])

    useEffect(()=>{
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex+1)%randomWords.length].word,
            randomWords[(wordIndex+2)%randomWords.length].word
        ].sort(()=> Math.random() - .5))
    }, [data.correctWords])

    const checkWord=(word)=>{
        if(word === randomWords[wordIndex].word){
            speak(randomWords[wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1)
            if(wordIndex !== data.playWords.length - 1){
                setWordIndex(wordIndex + 1)
            } else {
                setWordIndex(0) //there
                alert('Game is over')
            }
        } else {
            data.setErrorWords(data.errortWords + 1)
        }
    }
    return (
        <section>
            <span>Write a translation for this word</span>
            <h3>{randomWords[wordIndex].translate}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((word, index)=>(
                    <li key={index} onClick={()=>checkWord(word)} className={styles.btnCheck}>{word}</li>
                ))}
            </ul>
            
        </section>
    )
}

export default CheckIt