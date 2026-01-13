import { useState, useEffect } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, User,Menu,X } from "lucide-react";
import { useUserStore } from '../store/userStore';
 

function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userStore =useUserStore((state)=> state);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hideNavOn = ['/login','/signup'];
  const shouldHideNav = hideNavOn.includes(location.pathname);


if(!shouldHideNav)
{
  useEffect(()=>{
    userStore.getProfile();
  },[])
}
  const username=userStore.user?.username || localStorage.getItem('username');
  const userrole=userStore.user?.role || localStorage.getItem('role')
  const userchar=userStore.user?.username.slice(0,1) || localStorage.getItem('username').slice(0,1)


if(!shouldHideNav)
{
  return (
    <>
    

      <div className='flex h-screen bg-gray-50'>
      
      <div
  className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r cursor-pointer border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
  `}
>
  <div className="items-center md:hidden p-0 m-0">
    <button onClick={() => setIsSidebarOpen(false)}>
      <X className="fixed top-9 hover:cursor-pointer left-4 h-10 w-10 hover:bg-gray-200 rounded-full p-2  hover:opacity-70" />
    </button>
  </div>

 
  <Navigation />
</div>

      
      <div className='flex-1 flex flex-col md:ml-64'>
        <header className='bg-white border-b border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-8 w-8 hover:bg-gray-200 cursor-pointer p-2 hover:opacity-70" />
          </button>
          
            <div className='flex-1'></div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-600'>Welcome, {username}</span>
              <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="rounded-full h-8 w-8 bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {userchar}
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      sideOffset={8}
                      align="end"
                      className="w-56 rounded-md  bg-white p-1 shadow-md z-50"
                    >
                      <div className="px-3 py-2 text-sm font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{username}</p>
                          <p className="text-xs text-muted-foreground text-gray-500">{userrole}</p>
                        </div>
                      </div>

                      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                      <DropdownMenu.Item
                        className="flex items-center gap-2 px-3 py-2 text-sm text-black rounded-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <Link to='/profile' className='flex flex-row gap-2 w-full'><User className="h-4 w-4 text-gray-600" />
                        Profile</Link>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                      <DropdownMenu.Item
                        onClick={() => {
                            userStore.logout();
                            navigate("/login");}}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-black rounded-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <LogOut className="h-4 w-4 text-gray-600" />
                        Log out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
            </DropdownMenu.Root>
            </div>
          </div>
        </header>
      <main className='flex-1 overflow-auto p-6'>
        {children}
      </main>
      </div>
      </div>
    </>
  );
}
else
{
  return(
    <>
    {children}
    </>
  );
}
}

export default AppLayout;