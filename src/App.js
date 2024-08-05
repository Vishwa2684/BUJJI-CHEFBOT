
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import LikedRecipes from './components/LikedRecipes';
//pages and components
import Introduction from './pages/Introduction'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './pages/Chatbot';
import Test from './components/Test';

function App() {

  const {user} = useAuthContext()

  return (
    
    <div >
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={!user ? <Introduction /> : <Navigate to="/home" />}
            />
            <Route
              path='/home'
              element={ <Home />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/home" />}
            />
            <Route
              path='/chatbot'
              element={user ? <Chatbot /> : <Navigate to="/" />}
            />
            <Route
              path='/test'
              element={<Test />}
            />
            <Route path='liked-recipes' 
            element={user ? <LikedRecipes /> : <Navigate to="/" />}/>
          </Routes>

        </div>

        {/* <sathu /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
