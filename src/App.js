// import logo from './logo.svg';
import './App.css';
// import EnterCity from './component/EnterCity';
// import EnterState from './component/EnterState';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import City from './component/City';
import State from './component/State';
import Navbar from './component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './component/Home';

// import { Navbar } from 'react-bootstrap';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path ="/state" element={<State/>}/>
      <Route path ="/home" element={<Home/>}/>
      <Route path ="/city" element={<City/>}/>

    {/* <EnterState/> */}
    {/* <EnterCity/> */}
    </Routes>
    </>
  );
}

export default App;
