import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {useBookStore} from '../store/bookStore'
import { useBorrow_returnStore } from "../store/borrow-returnStore";
import { useMemberStore } from "../store/memberStore";
import { useUserStore } from "../store/userStore";


function Dashboard() {
  

const bookStore = useBookStore((state) => state);
const memberStore = useMemberStore((state) => state);
const borrow_returnStore = useBorrow_returnStore((state) => state);
const userStore = useUserStore((state) => state);


  useEffect(()=>{
    userStore.getProfile();
  },[])

  const userrole=userStore.user?.role || localStorage.getItem('role')

  const isAdmin=()=>{
    return userrole==='admin'
  }

    useEffect(()=>{
        bookStore.getBooks();
      },[]);

    useEffect(()=>{
    memberStore.getMembers();
    },[]);
    
    useEffect(()=>{
    borrow_returnStore.getBorrows();
    },[]);

    useEffect(()=>{
    borrow_returnStore.getBorrows_overdue();
    },[]);

   const active_borrows = borrow_returnStore.borrow_records.filter(
  (record) => record.return_date === null
);
     const returned_borrows = borrow_returnStore.borrow_records.filter(
  (record) => record.return_date != null
);

const returned_borrows_sort = returned_borrows.sort((a, b) => new Date(b.return_date) - new Date(a.return_date));
const active_borrows_sort=active_borrows.sort((a, b) => new Date(b.borrow_date) - new Date(a.borrow_date));


const Recent = (() => {
  const recent = [];

  let i = 0; 
  let j = 0; 

  while (i < returned_borrows_sort.length && j < active_borrows_sort.length) {
    const returned = returned_borrows_sort[i];
    const active = active_borrows_sort[j];

    const returnedDate = new Date(returned.return_date);
    const activeDate = new Date(active.borrow_date);

    if (returnedDate > activeDate) {
      recent.push(returned);
      i++;
    } else {
      recent.push(active);
      j++;
    }
  }

  
  while (i < returned_borrows_sort.length) {
    recent.push(returned_borrows_sort[i++]);
  }

  while (j < active_borrows_sort.length) {
    recent.push(active_borrows_sort[j++]);
  }

  return recent.slice(0,5);
})();
;




  return (
    <div className="space-y-6">
      
      { isAdmin() ?(
      <div className="grid grid-rows-2 gap-2">
      {/*if admin */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
             <div className="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1 text-xs font-semibold hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 mr-1"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
          ADMINISTRATOR
        </div>
          </div>
          <p className="text-gray-600 w-fit">Full system access - Manage all library operations</p>
        </div>
      </div>
      
          <div className="rounded-lg border  shadow-sm border-red-200 bg-red-50">
            <div className="p-6 pt-6"><div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield h-8 w-8 text-red-600"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
              <div>
                <h3 className="font-semibold text-red-900 w-fit">Administrator Access</h3>
                <p className="text-sm text-red-700 w-fit text-left">You have full system privileges including delete operations, genre management, and staff administration.</p></div>
                </div>
                </div>
                </div>
                {/* */}
              </div>):(
                
                <div className="grid grid-rows-2 gap-2">
                  <div class="flex items-center justify-between"><div>
                    <div class="flex items-center space-x-3">
                      <h1 class="text-3xl font-bold text-gray-900">Librarian Dashboard</h1>
                      <div class="bg-black text-white inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-3 h-3 mr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>LIBRARIAN
                      </div></div>
                  <p class="text-gray-600">Standard library operations - Books, members, and borrowing</p></div></div>

                  <div class="rounded-lg border text-card-foreground shadow-sm border-green-200 bg-green-50">
                    <div class="p-6 pt-6">
                      <div class="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-8 w-8 text-green-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <div>
                          <h3 class="font-semibold text-green-900 w-fit">Librarian Access</h3>
                          <p class="text-sm text-green-700">You can manage books and members, handle borrowing operations, and view reports. Contact admin for advanced operations.</p>
                          </div></div></div></div>

                </div>)}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="rounded-lg  bg-white  shadow-sm border-gray-200 border">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 ">
                      <div className="tracking-tight  text-sm font-medium">Total Books</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open h-4 w-4 text-muted-foreground"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="text-2xl font-bold w-fit">{bookStore.books.length}</div>
                        <p className="text-xs text-gray-700 w-fit">All books in system</p>
                        </div>
                        </div>
                        <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                              <div className="tracking-tight text-sm font-medium">Total Members</div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <div className="p-6 pt-0">
                              <div className="text-2xl font-bold w-fit">{memberStore.members.length}</div>
                            </div>
                            </div>
                            <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="tracking-tight text-sm font-medium">Active Borrows</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-4 w-4 text-muted-foreground"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                              </div>
                              <div className="p-6 pt-0">
                                <div className="text-2xl font-bold w-fit">{active_borrows.length}</div>
                              </div></div>
                              <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                  <div className="tracking-tight text-sm font-medium">Overdue Books</div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert h-4 w-4 text-red-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                                </div>
                                  <div className="p-6 pt-0">
                                    <div className="text-2xl font-bold text-red-600 w-fit">{borrow_returnStore.borrow_records_overdue.length}</div>
                                  </div>
                              </div>
                </div>
                              <div className="rounded-lg border-gray-200 border bg-white  shadow-sm">
                                <div className="flex flex-col space-y-1.5 p-6">
                                  <div className="text-2xl font-semibold leading-none tracking-tight w-fit">Quick Actions</div>
                                  <div className="text-sm text-muted-foreground w-fit">Administrative and library operations</div>
                                  </div>
                                  <div className="p-6 pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                      <Link className=" bg-black text-white justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:opacity-80 h-auto p-4 flex flex-col items-center space-y-2" to="/borrow-return">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-6 w-6"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                                      <span>Borrow Book</span>
                                      </Link>

                                      <Link className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-gray-200 border border-input hover:bg-gray-200 hover:text-accent-foreground h-auto p-4 flex flex-col items-center space-y-2 " to="/borrow-return">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-6 w-6"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                                      <span>Return Book</span>
                                      </Link>
                                      
                                      <Link className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-gray-200 border border-input hover:bg-gray-200 hover:text-accent-foreground h-auto p-4 flex flex-col items-center space-y-2 " to="/members">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus h-6 w-6"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg><span>Add Member</span>
                                      </Link>
                                      
                                      <Link className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-gray-200 border border-input hover:bg-gray-200 hover:text-accent-foreground h-auto p-4 flex flex-col items-center space-y-2 " to="/books">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus h-6 w-6"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg><span>Add Book</span>
                                      </Link>
                                      
                                      {isAdmin() && (
                                        
                                      <Link className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border hover:text-accent-foreground h-auto p-4 flex flex-col items-center space-y-2 bg-red-50 border-red-200 text-red-700 hover:bg-red-100" to="/genres">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings h-6 w-6"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg><span>Manage Genres</span>
                                      </Link>)}
                                      {isAdmin() && (
                                      <Link className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border hover:text-accent-foreground h-auto p-4 flex flex-col items-center space-y-2 bg-red-50 border-red-200 text-red-700 hover:bg-red-100" to="/reports">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-column h-6 w-6"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg><span>Admin Reports</span>
                                      </Link>)}
                                      
                                      </div>
                                      </div>
                                      </div>

                                      <div className="rounded-lg border border-gray-200 bg-white  shadow-sm">
                                        <div className="flex flex-col space-y-1.5 p-6">
                                          <div className="text-2xl font-semibold leading-none tracking-tight w-fit">Recent Activity</div>
                                          <div className="text-sm text-muted-foreground w-fit">System-wide borrow and return operations</div>
                                          </div>
                                          <div className="p-6 pt-0">
                                          
                                            <div className="space-y-4">
                                              {Recent?.map((borrow) => (

                                              !borrow.return_date? (<div className="flex items-center space-x-4 p-3 bg-gray-100  rounded-lg">
                                              <div className="p-2 rounded-full bg-blue-100 text-blue-600 ">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-4 w-4"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                                            </div>
                                            <div className="flex-1">
                                              <p className="text-sm font-medium w-fit">Borrowed: {borrow.book.name}</p>
                                            <p className="text-xs text-gray-500  w-fit">Member: {borrow.member.name} • {borrow.borrow_date}</p>
                                            </div>
                                            </div>):
                                            (
                                            <div className="flex items-center space-x-4 p-3 bg-gray-100  rounded-lg">
                                              <div className="p-2 rounded-full bg-green-100 text-green-600">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-right h-4 w-4"><path d="M8 3 4 7l4 4"></path><path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
                                            </div>
                                            <div className="flex-1">
                                              <p className="text-sm font-medium  w-fit">Returned: {borrow.return_date}</p>
                                            <p className="text-xs text-gray-500  w-fit">Member: {borrow.member.name}• {borrow.return_date}</p>
                                            </div>
                                            </div>
                                                 )
                                                 ))}
                                            </div>

                                          </div>
                                      </div>
      </div>
  );

}

export default Dashboard;
