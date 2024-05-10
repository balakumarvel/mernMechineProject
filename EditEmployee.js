import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState('');
  let [designation, setDesignation] = useState('');
  let [gender, setGender] = useState('');
  let [course, setCourse] = useState([]);
  let [image, setImage] = useState(null);

  let idObj = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/employee-list/${idObj.ID}`)
      .then((response) => {
        const { name, email, phone, designation, gender, course } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setDesignation(designation);
        setGender(gender);
        setCourse(course);
      })
      .catch(() => { console.log("error"); });
  }, [idObj.ID]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter(course => course !== value));
    }
  };

  const formHandle = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('designation', designation);
    formData.append('gender', gender);
    course.forEach(course => formData.append('course', course));
    if (image) {
      formData.append('image', image);
    }

    axios.put(`http://localhost:4001/employee-list/${idObj.ID}`, formData)
      .then((response) => {
        alert(response.data);
        navigate("/employee-list");
      })
      .catch(() => { console.log("error"); });
  };

  return (
    <div className="container mt-5">
      <h1>Update Employee Data</h1>
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
        <input type="checkbox" id="MCA" name="course" value="MCA" checked={course.includes('MCA')} onChange={handleCheckboxChange} />
        <label htmlFor="MCA" className="mx-2"> MCA </label>
        <input type="checkbox" id="BCA" name="course" value="BCA" checked={course.includes('BCA')} onChange={handleCheckboxChange} />
        <label htmlFor="BCA" className="mx-2"> BCA </label>
        <input type="checkbox" id="BSC" name="course" value="BSC" checked={course.includes('BSC')} onChange={handleCheckboxChange} />
        <label htmlFor="BSC" className="mx-2"> BSC </label>

        <label htmlFor="">Upload your photo</label><br />
        <input className="form-control my-2" type="file" name='image' onChange={(e) => { setImage(e.target.files[0]) }} /><br />
        <button className='btn btn-danger' onClick={formHandle}> Update Changes</button>
      </div>
    </div>
  );
};

export default EditEmployee;
