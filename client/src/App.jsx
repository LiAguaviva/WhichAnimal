
import React, { useState, useEffect } from 'react';
import { getRandom } from './utils/utils';
import { questions } from './data/questions';
import './App.css'

function App() {
  const [randomNum, setRandomNum] = useState(''); 
  const [selectedNum, setSelectedNum] = useState(null);
  const [machineChoice, setMachineChoice] = useState(null);

  const [playerAnimal, setPlayerAnimal] = useState(null);
  const [machineAnimal, setMachineAnimal] = useState(null);
  const [randomAnimal, setRandomAnimal] = useState('');

  const [question, setQuestion] = useState(null);

  const [Cont, setCont] = useState(0);
  const [MessageNull, setMessageNull] = useState(null);


  useEffect(() => {
    getQuestion()
  }, [])
  

  const getQuestion = () => {
    let questionPosition = getRandom(0,questions.length)
    setQuestion(questions[questionPosition])
  }
  

  const select = (num) => {

    if (selectedNum === null) {
      setSelectedNum(num);
      setPlayerAnimal(getAnimal(num));
      let tempRandomNum = getRandom(0,9);

      if(tempRandomNum === num && tempRandomNum === 9) {
        tempRandomNum = getRandom(0,8);
      } else if (tempRandomNum === num && tempRandomNum === 0) {
        tempRandomNum = getRandom(1,9);
      } else if (tempRandomNum === num){
        tempRandomNum = getRandom(1,9) + 1;
      }

      setMachineChoice(tempRandomNum);
      setMessageNull(null);
      setMachineAnimal(getAnimal(tempRandomNum));
    }
  }

  const getAnimal = (num) => {
    const animals = [
      'Lion', 'Cat', 'Wolf', 'Dog', 'Snake',
      'Whale', 'Mouse', 'Bear', 'Turtle', 'Cockroach'
    ];
  
    return animals[num];
  }
  
  const pushButton = () => {

    if (selectedNum !== null && randomNum !== null) {
      let tempRandomNum = getRandom(0,9);
      setRandomNum(tempRandomNum);
      setRandomAnimal(getAnimal(tempRandomNum));
      if (randomNum !== selectedNum) {
        setCont(Cont + 1);
      }
       
    } else {
      setMessageNull('You must select an animal');      
    }
    
  }
  
  const reset = () => {
    setSelectedNum(null)
    setMachineChoice(null)
    setRandomNum('')
    setPlayerAnimal(null)
    setMachineAnimal(null)
    setRandomAnimal('')
    setCont(0)
    getQuestion();
  }
  

  return (
    <div className="container">
      <div className="titleCont">
        <h1>Which Animal...?</h1>
        <div>
        <p>Select your answer and... Good Luck!</p>
      </div>
    </div>
    <p className='question'>{question}</p>
      <div>
        <button 
          className={`${selectedNum === 0 && 'selected'} choiceButtons`} 
          onClick={()=>select(0)}
        >Lion</button>
        <button 
          className={`${selectedNum === 1 && 'selected'} choiceButtons`} 
          onClick={()=>select(1)}
        >Cat</button>
        <button 
          className={`${selectedNum === 2 && 'selected'} choiceButtons`} 
          onClick={()=>select(2)}
        >Wolf</button>
        <button 
          className={`${selectedNum === 3 && 'selected'} choiceButtons`} 
          onClick={()=>select(3)}
        >Dog</button>
        <button 
          className={`${selectedNum === 4 && 'selected'} choiceButtons`} 
          onClick={()=>select(4)}
        >Snake</button>
        <button 
          className={`${selectedNum === 5 && 'selected'} choiceButtons`} 
          onClick={()=>select(5)}
        >Wale</button>
        <button 
          className={`${selectedNum === 6 && 'selected'} choiceButtons`} 
          onClick={()=>select(6)}
        >Mouse</button>
        <button 
          className={`${selectedNum === 7 && 'selected'} choiceButtons`} 
          onClick={()=>select(7)}
        >Bear</button>
        <button 
          className={`${selectedNum === 8 && 'selected'} choiceButtons`} 
          onClick={()=>select(8)}
        >Turtle</button>
        <button 
          className={`${selectedNum === 9 && 'selected'} choiceButtons`} 
          onClick={()=>select(9)}
        >Cockroach</button>
      </div>

      <div className="choicesCont">
        <span>
          <p>Your Choice:</p> <p className="choice">{playerAnimal}</p>
        </span>
        <span>
          <p>The Machine Choice:</p> <p className="choice">{machineAnimal}</p>
        </span>
      <p>Round: {Cont}</p>
      </div>

      

      {randomNum === selectedNum && 
        <>
          <p className='findedAnimal'>It's the {playerAnimal}!!!</p>
          <p className="win">YOU WIN!!!</p>
        </>}

      {randomNum === machineChoice && 
        <>
          <p className='findedAnimal'>It's the {machineAnimal}!!!</p>
          <p className="win">MACHINE WIN...</p>
        </>}   
    



      {randomNum === selectedNum || randomNum === machineChoice ?
        <button 
          className='restart' 
          onClick={()=>reset()}
        >Play Again</button>
      : <button 
        className="tryButton" 
        onClick={() => {randomNum !== selectedNum && pushButton()}}
      ><span>Could be... </span>
      <span>{randomAnimal}?</span></button>}

        
      
      <p>{MessageNull}</p>
    </div>
  )
}

export default App
