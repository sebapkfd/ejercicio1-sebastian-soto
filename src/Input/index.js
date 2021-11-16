import React, { useEffect, useState } from 'react'
import { getFakeData1, getFakeData2 } from '../fakeRequest'

const Input = ({ inputValue, onChangeInputValue }) => {
  const [inputValueInComponent, setInputValueInComponent] = useState('');
  let users = [];

  const fetchData = async () => {
    const firstNameWithId = await getFakeData1()
    const lastNameWithId = await getFakeData2()

    users = firstNameWithId.map(user => {
      const userLastname = lastNameWithId.find(item => item.id === user.id);
      if (userLastname) {
        const {lastName} = userLastname;
        return {...user, lastName}
      }
    })
    .filter(item => item !== undefined)
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

    console.log({firstNameWithId, lastNameWithId})
    console.log(users);
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setInputValueInComponent(inputValue);
  }, [inputValue]);

  return (
    <input
      onChange={e => onChangeInputValue(e.target.value)}
      value={inputValueInComponent}
    />
  )
}

export default Input;