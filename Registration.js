import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()
        if(!name || !email || !password){
            alert("To register Fill all the fields..!")
        }else(
        axios.post('http://localhost:4005/register', { name, email, password })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
        )
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>logo</h1>
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">Registration Form</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className='text-center' my-4  style={{ marginTop: '2rem' }}>
                                <button type="button" className="btn btn-primary btn-block" onClick={submitForm}>Register</button>
                                </div>
                            </form>
                            <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
