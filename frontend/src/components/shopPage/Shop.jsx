import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

export default async function Shop() {

  const {users} = useSelector((state) => state.user);
  const response = await axios.get('http://localhost:5000/auth/signup');

  return (
    <div>
       {response}
    </div>
  )
}
