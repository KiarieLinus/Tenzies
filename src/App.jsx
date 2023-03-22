import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const result = dice.every(die =>
      die.isHeld && die.value === dice[0].value
    )

    if (result) {
      setTenzies(true)
      console.log("You won!")
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [...Array(10).keys()].map(() => (
      generateNewDie()
    ))
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    }
    else {
      setDice(prevDice =>
        prevDice.map(die =>
          (die.isHeld) ?
            die :
            generateNewDie()
        ))
    }
  }

  function holdDice(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        (die.id === id) ?
          {
            ...die,
            isHeld: !die.isHeld
          } :
          die
      )
    )
  }

  const diceElements = dice.map(die => {
    return (
      <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={() => holdDice(die.id)} />
    )
  }
  )

  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
