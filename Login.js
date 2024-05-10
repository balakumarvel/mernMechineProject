import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const navigate = useNavigate()
        
    const onSubmit =()=>{
        axios.post('http://localhost:4005/login',{email,password})
        .then(result=>{
            console.log(result)
            if(result.data==='sucess'){
                navigate('/Home')
            }
             })
        .catch(err=>console.log(err)   
    )
        
    }


  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <p>logo</p>
            <div className="card p-6" >
                <div className="card-body">

    
         <p className='text-start ' >LoginPage</p> 
      
         <div className='form-group'>
         <input type="text" className='form-control' placeholder='EnterEmail' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
         </div>
        
         <br />
         <div className='form-group'>
         <input type="password" className='form-control' placeholder='EnterPassword' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
         </div>
        
         <br />
         <div className='text-center'  style={{ marginTop: '1rem' }}>
         <button className='btn btn-success' onClick={onSubmit}>LOGIN</button> 
         </div>
         
       


         


         </div>
         </div>
         </div>
         </div>
        </div>
  )
}

export default Login