import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const handleCourseChange = (e) => {
        const { value } = e.target;
        if (course.includes(value)) {
            setCourse(course.filter((c) => c !== value));
        } else {
            setCourse([...course, value]);
        }
    };

    const formHandle = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("designation", designation);
        formData.append("gender", gender);
        course.forEach((c) => formData.append("course", c));
        formData.append("image", image);

        if (!name || !email || !phone || !designation || !gender || !course.length || !image) {
            alert("To Create An Employee, Fill All The Above Details");
        } else {
            axios.post('http://localhost:4005/employee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.log("Error while registering employee:", error);
                alert("Failed to register employee. Please try again.");
            });
            navigate("/employee-list");
        }
    };

    return (
        <div className="container mt-5">
        <h1>Create Employee Data</h1>
        <div>
          <input className="form-control my-2" placeholder='Enter Full Name' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
          <input className="form-control my-2" placeholder='Enter Email' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input className="form-control my-2" placeholder='Enter Phone Number' type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
  
          <label htmlFor="">Designation</label>
          <select className="form-select my-2" name="gender" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
  
          <label htmlFor="">Gender : </label><br />
          <input type="radio" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="male" className="mx-2"> Male </label>
          <input type="radio" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="female" className="mx-2"> Female </label><br />
  
          <label>Course :</label><br />
          <input type="checkbox" id="MCA" name="course" value="MCA" checked={course.includes('MCA')} onChange={handleCourseChange} />
          <label htmlFor="MCA" className="mx-2"> MCA </label>
          <input type="checkbox" id="BCA" name="course" value="BCA" checked={course.includes('BCA')} onChange={handleCourseChange} />
          <label htmlFor="BCA" className="mx-2"> BCA </label>
          <input type="checkbox" id="BSC" name="course" value="BSC" checked={course.includes('BSC')} onChange={handleCourseChange} />
          <label htmlFor="BSC" className="mx-2"> BSC </label>
  
          <label htmlFor="">Upload your photo</label><br />
          <input className="form-control my-2" type="file" name='image' onChange={(e) => { setImage(e.target.files[0]) }} /><br />
          <button className='btn btn-danger' onClick={formHandle}> Register Me</button>
        </div>
      </div>
    );
};

export default CreateEmployee;
