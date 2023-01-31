import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function Registerscreen() {
  const [name, setname] =  useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()

  async function register(){
    if(password==cpassword)
    {
      const user={
        name,
        email,
        password,
        cpassword
      }
      try {
        setloading(true);
        const result = await axios.post('/api/users/register', user).data;
        setloading(false)
        setsuccess(true)
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
      } catch (error) {
        console.log(error);
        setloading(false)
        seterror(true)
      }
    }
    else {
      alert('Password does not matched.')
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
          {success && (<Success message="Registration Successful" />)}
            <div className='bs'>
              <h2 className='text-center p-3'>Register</h2>
              <input type="text" className='form-control mb-2' placeholder='Name' value={name} onChange={(e) => {setname(e.target.value)}} />
              <input type="text" className='form-control mb-2' placeholder='Email' value={email} onChange={(e) => {setemail(e.target.value)}} />
              <input type="text" className='form-control mb-2' placeholder='Password' value={password} onChange={(e) => {setpassword(e.target.value)}} />
              <input type="text" className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e) => {setcpassword(e.target.value)}} />
              <button className='btn btn-primary mt-3' onClick={register}>Register</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Registerscreen