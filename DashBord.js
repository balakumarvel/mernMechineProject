import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const DashBord = () => {
    const [name, setName] = useState('');
    const { ID } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4005/user/${ID}`)
            .then((response) => {
                setName(response.data);
            })
            .catch(() => {
                console.log("unable to fetch data ");
            });
    }, [ID]);

    return (
        <div>
            <div id='navbar' className='bg-gray-300'>
                <ul className='nav justify-content-between gap-4 px-10'>
                    <li className='nav-item'>Home</li>
                    <li className='nav-item'>
                        <Button variant="link"><Link to='/create-empoloyee'className="custom-link" >Create Employee</Link></Button>
                    </li>
                    <li className='nav-item'>
                      <Button variant="link"><Link to="/employee-list"className="custom-link" >Employee list</Link></Button>
                    </li>
                    <li className='nav-item p-2 text-danger border border-danger'>{name}</li>
                    <li className='nav-item'>Logout</li>
                </ul>
            </div>
            <div className='bg-warning p-2'>
                <h1 className='text-center text-white'>Dashboard</h1>
            </div>
            <div className='text-center mt-3'>
                <p>Welcome to the admin panel</p>
            </div>
        </div>
    );
};

export default DashBord;
