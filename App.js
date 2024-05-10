
import './App.css';
import CreateEmployee from './components/CreateEmployee';
import DashBord from './components/DashBord';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Registration from './components/Registration';
import {  Route, Routes,  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
   
     <div>
      

      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Home' element={<DashBord/>}/>
        <Route path='/create-empoloyee' element={<CreateEmployee/>}/>
        <Route path='/employee-list' element={<EmployeeList/>}/>
        <Route path='/edit-employee/:id' element={<EditEmployee/>}/>
        
      </Routes>

    

     </div>
  );
}

export default App;
