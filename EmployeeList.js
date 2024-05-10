import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [infoFromDB, setInfoFromDB] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4005/employee-list")
            .then((response) => {
                setInfoFromDB(response.data);
            })
            .catch((error) => {
                console.log("Error from EmployeeList useEffect:", error);
            });
    }, [reload]);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4005/employee-list/${id}`)
            .then(() => {
                setReload(reload + 1); // Increment reload to trigger useEffect
            })
            .catch((error) => {
                console.log("Error deleting user:", error);
            });
    };

    return (
        <div className="container mt-5">
            <p>Total Count : {infoFromDB.length}</p>
            <table className="table ">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {infoFromDB.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td><img src={`http://localhost:4005/Images/${item.image}`} alt="Employee" width={50} height={50} /></td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.designation}</td>
                            <td>{item.gender}</td>
                            <td>{item.course.join(', ')}</td>
                            <td>
                                <Link to={`/edit-employee/${item._id}`}>Edit</Link> - 
                                <button className="btn btn-danger" onClick={() => deleteUser(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
