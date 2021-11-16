import React, { useState } from 'react'
import Input from '../Input/index'
import logo from '../resources/logo512.png'

function App() {
  const [inputValue, setInputValue] = useState('');

  const onChangeInputValue = (value) => {
    setInputValue(value);
  }

  return (
    <>
      <div>
        <Input
          inputValue={inputValue}
          onChangeInputValue={(value) => onChangeInputValue(value)}
        />
      </div>
      <img src={logo} alt={'logo'} />
    </>
  )
}

export default App;
