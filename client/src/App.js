import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import UserPosts from './components/UserPosts/UserPosts';



const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Navigate to='/posts' />} />
                    <Route path='/posts' element={<Home />} />
                    <Route path='/posts/search' element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/tags/:name' element={<UserPosts />} />
                    <Route path='/creator/:name' element={<UserPosts />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
    
    
}

export default App;