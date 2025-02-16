import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatingListing from './pages/CreatingListing';
import UpdatingListing  from './pages/UpdatingListing'
import Listing from './pages/Listing';
import Search from './pages/Search';
export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path='/search' element={<Search />} />
    <Route element={<PrivateRoute />} />
    <Route path="/profile" element={<Profile />} />
    <Route path='/create-listing' element={<CreatingListing />}></Route>
    <Route path='/update-listing/:listingId' element={<UpdatingListing />}></Route>
    <Route path='/listing/:listingId' element={<Listing />}></Route>
  </Routes>
  </BrowserRouter>
   
  
}
