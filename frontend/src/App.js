import {Fragment} from "react"
import {Routes,Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import Home from "./Components/Home/home"
import LoginPage from "./Components/LoginPage"
import Dishes from "./Components/Dishes"
import ProtectedRoute from "./Components/ProtectedRoutes";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Fragment>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/dishes' element={<ProtectedRoute><Dishes/></ProtectedRoute>}/>
      <Route exact path ="/login" element ={<LoginPage />}/>
      </Fragment>
      
    </Routes>
    </BrowserRouter>
    
 );
}

export default App;
