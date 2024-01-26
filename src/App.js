import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Activate from './pages/auth/Activate';
import ResetPassword from './pages/auth/ResetPassword';
import ResetPasswordConfirm from './pages/auth/ResetPasswordConfirm';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404 />} />

          <Route path='/' element={<Home />} />

          {/* Authentication */}
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activate/:uid/:token' element={<Activate />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: '#bbf7d0',
              color: '#16a34a'
            },
          },
          error: {
            style: {
              background: '#fecaca',
              color: '#dc2626'
            },
          },
        }}
      />
    </Provider>
  );
}
export default App;
