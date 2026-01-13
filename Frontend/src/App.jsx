import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Books from './pages/books';
import Borrow_return from './pages/borrow-return';
import Genres from './pages/genres';
import Members from './pages/members';
import Reports from './pages/reports';
import Staff from './pages/staff';
import Profile from './pages/profile';
import Signup from './pages/Signup';
import { useUserStore } from './store/userStore';
import { useState,useEffect } from "react";
import NotFound from './pages/NotFound';
import SingleBook from './pages/singlebook';
import SingleMember from './pages/singlemember';
import SingleGenre from './pages/singlegenre';
import Singleborrow_return from './pages/singleborrow-record';
import './App.css';

function ProtectedRoutes() {
  const userStore =useUserStore((state)=> state);
  const isAuthenticated = userStore.isAuthenticated;
  const location = useLocation();
 
  useEffect(()=>{
    userStore.getProfile();
  },[])

  const userrole=userStore.user?.role || localStorage.getItem('role')
        const isAdmin=()=>{
      return userrole==='admin'
    }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/borrow-return" element={<Borrow_return />} />
        <Route path="/borrow-return/:id" element={<Singleborrow_return />} />
        {isAdmin() ?(<>
        <Route path="/staff" element={<Staff />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<SingleMember />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<SingleGenre />} />
        </>):(
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
