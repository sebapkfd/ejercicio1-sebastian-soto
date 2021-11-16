import React, { useEffect, useState } from 'react'
import { getFakeData1, getFakeData2 } from '../fakeRequest'

const Input = ({ inputValue, onChangeInputValue }) => {
  const [inputValueInComponent, setInputValueInComponent] = useState('');
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const firstNameWithId = await getFakeData1()
    const lastNameWithId = await getFakeData2()

    const newUserList = firstNameWithId.map(user => {
      const userLastname = lastNameWithId.find(item => item.id === user.id);
      if (userLastname) {
        const {lastName} = userLastname;
        return {...user, lastName}
      }
    })
    .filter(item => item !== undefined)
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

    setUsers(newUserList);

    console.log({firstNameWithId, lastNameWithId})
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setInputValueInComponent(inputValue);
  }, [inputValue]);

  return (
    <div>
        <input
          onChange={e => onChangeInputValue(e.target.value)}
          value={inputValueInComponent}
        />
        {(inputValueInComponent.length > 0 ) ? (
          <div>
            {users.map(user => {
              if (user.firstName.toLowerCase().includes(inputValueInComponent.toLowerCase()) || user.lastName.toLowerCase().includes(inputValueInComponent.toLowerCase())) {
                return <p key={user.id}>{user.firstName} {user.lastName}</p>
              }
            })}
          </div>
        ): null }
    </div>
  )
}

export default Input;