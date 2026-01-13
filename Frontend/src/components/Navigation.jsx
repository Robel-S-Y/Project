import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";


function Navigation() {
  const location = useLocation()
  const navigate = useNavigate();
  const userStore = useUserStore((state) => state);

  useEffect(()=>{
    userStore.getProfile();
  },[])

  const userrole=userStore.user?.role || localStorage.getItem('role')

      const isAdmin=()=>{
    return userrole==='admin'
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
    
      
      <div className="flex flex-col h-full">
        
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Library Manager</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            
            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house mr-3 h-5 w-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>Dashboard</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/books")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/books"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open mr-3 h-5 w-5"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>Books</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/borrow-return")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/borrow-return"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right mr-3 h-5 w-5"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>Borrow/Return</Link>
                
               {isAdmin() &&(<>
            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/members")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/members"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users mr-3 h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>Members</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/staff")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/staff"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-cog mr-3 h-5 w-5"><circle cx="18" cy="15" r="3"></circle><circle cx="9" cy="7" r="4"></circle><path d="M10 15H6a4 4 0 0 0-4 4v2"></path><path d="m21.7 16.4-.9-.3"></path><path d="m15.2 13.9-.9-.3"></path><path d="m16.6 18.7.3-.9"></path><path d="m19.1 12.2.3-.9"></path><path d="m19.6 18.7-.4-1"></path><path d="m16.8 12.3-.4-1"></path><path d="m14.3 16.6 1-.4"></path><path d="m20.7 13.8 1-.4"></path></svg>Staff</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/reports")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/reports"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-column mr-3 h-5 w-5"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>Reports</Link>

            <Link className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors  ${
                  isActive("/genres")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`} to="/genres"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-tag mr-3 h-5 w-5"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>Genres</Link>
                  </>)}
            </nav>
        </div>
      
    </>
  );
}

export default Navigation;
