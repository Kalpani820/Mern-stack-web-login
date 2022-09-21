import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import AdminPage from './pages/adminPage';
import UserPage from './pages/userPage';
import Home from './pages/home';
// import ProtectedRoute from './protectedRoutes';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route exact path="/user" element={<ProtectedRoute Component={UserPage} />} />
          <Route exact path="/admin" element={<ProtectedRoute Component={AdminPage} />} /> */}

          <Route exact path="/user" element={<UserPage/>}/>
          <Route exact path="/admin" element={<AdminPage/>} />

          <Route exact path="/" element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}


export default App;
