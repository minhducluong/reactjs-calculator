import React, { useState, useEffect } from 'react';
import './App.css';

import Screen from './components/Screen';
import Reset from './components/Reset';
import Operator from './components/Operator';
import Input from './components/Input';
import Calculate from './components/Calculate';

function App() {
  const [display, setDisplay] = useState('')
  const [fadeEffect, setFadeEffect] = useState(false)

  const updateDisplay =((value) => {
    setDisplay(display => display + value)
  })

  const resetDisplay = () => {
    setDisplay('')
  }

  const makeFadeEffect = () => {
    setFadeEffect(true)
    setTimeout(() => {
      setFadeEffect(false)
    }, 500);
  }

  const calculate = () => {
    setDisplay(display => {
      let toBeCalculated = display
      toBeCalculated = toBeCalculated.replace(/×/g, "*")
      toBeCalculated = toBeCalculated.replace(/÷/g, "/")
      try {
        // eslint-disable-next-line
        return eval(toBeCalculated)
      } catch(e) {
        alert("Ông phá máy rồi!")
        return ''
      }
    })

    makeFadeEffect()
  }

  const checkError = (result) => {
    if (!result) {
      alert("Ông phá máy rồi!")
      setDisplay('')
    } else {
      setDisplay(result)
    }
  }

  const sqr = () => {
    // eslint-disable-next-line
    let result = eval(display * display)
    checkError(result)
    makeFadeEffect()
  }

  const sqrt = () => {
    let result = Math.sqrt(display)
    checkError(result)
    makeFadeEffect()
  }

  const factorial = () => {
    let result = 1
    let number = Number(display)

    if (display === "0") setDisplay('1')
    else if (number > 0 && Number.isInteger(number)) {
      for (let i = 1; i <= number; i++) {
        result *= i;
      }
      setDisplay(result)
    } else {
      alert("Ông phá máy rồi!");
      setDisplay('')
    }
    makeFadeEffect()
  }

  const percent = () => {
    let result = display / 100
    checkError(result)
    makeFadeEffect()
  }

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      // Deactivate spacebar
      if (event.key === " ") return

      // keys that can be typed
      const targetKeys = [
        '+', '-', '*', '/', '.',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ]

      targetKeys.forEach(item => event.key === item && updateDisplay(event.key))

      // When enter '='
      if (event.key === "=" || event.key === 'Enter') calculate()

      // When use Backspace
      if (event.key === 'Backspace') {
        setDisplay(display => {
          let arr = display.toString().split('');
          arr.pop();
          return arr.join('')
        })
      }
    })
  }, [])

  return (
    <div className="Calculator">
      <div className="Calculator-wrapper">
        <Screen display={display} fadeEffect={fadeEffect} />
        <Reset resetDisplay={resetDisplay} />
        <Operator text="x²" operation={sqr} />
        <Operator text="x!" operation={factorial} />
        <Operator text="√x" operation={sqrt} />
        <Operator text="x%" operation={percent} />
        <Input value="7" updateDisplay={updateDisplay} />
        <Input value="8" updateDisplay={updateDisplay} />
        <Input value="9" updateDisplay={updateDisplay} />
        <Input value="÷" updateDisplay={updateDisplay} />
        <Input value="4" updateDisplay={updateDisplay} />
        <Input value="5" updateDisplay={updateDisplay} />
        <Input value="6" updateDisplay={updateDisplay} />
        <Input value="×" updateDisplay={updateDisplay} />
        <Input value="1" updateDisplay={updateDisplay} />
        <Input value="2" updateDisplay={updateDisplay} />
        <Input value="3" updateDisplay={updateDisplay} />
        <Input value="-" updateDisplay={updateDisplay} />
        <Input value="0" updateDisplay={updateDisplay} position="bottom-left" />
        <Input value="." updateDisplay={updateDisplay} />
        <Calculate calculate={calculate} />
        <Input value="+" updateDisplay={updateDisplay} position="bottom-right" />
      </div>
      <div className="Calculator-guide">Bạn có thể dùng bàn phím để nhập phép tính</div>
    </div>
  );
}

export default App;
