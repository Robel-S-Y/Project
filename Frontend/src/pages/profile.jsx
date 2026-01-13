import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";



function Profile() {
  
  const userStore = useUserStore((state) => state);

  useEffect(()=>{
    userStore.getProfile();
  },[])
  const username=userStore.user?.username || localStorage.getItem('username');
  const useremail=userStore.user?.email || localStorage.getItem('email');
  const userrole=userStore.user?.role || localStorage.getItem('role')

  const isAdmin=()=>{
    return userrole==='admin'
  }

   
  

  return (
  <div class="space-y-6 max-w-2xl">
    <div>
        <h1 class="text-3xl font-bold text-gray-900 w-fit">Profile</h1>
        <p class="text-gray-600 w-fit">View your account information and permissions</p></div>
        <div class="rounded-lg border border-gray-200 bg-white bg-card text-card-foreground shadow-sm">
            <div class="flex flex-col space-y-1.5 p-6"><div class="flex items-center space-x-4">
                <div class="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-shield h-8 w-8 text-blue-600">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 
                        13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 
                        5a1 1 0 0 1 1 1z"></path></svg></div><div>
                            
                            <div class="font-semibold tracking-tight text-xl">{username}</div>

                               
                            <div class="text-sm text-muted-foreground flex items-center mt-1">
                                <div class="capitalize inline-flex items-center rounded-full border px-2.5 
                                py-0.5 text-xm font-bold border-transparent bg-black text-white">{userrole}</div></div>
                                
                                </div></div></div>
                                
                                <div class="p-6 pt-0 space-y-6">
                                    <div class="space-y-4">
                                        
                                        <h3 class="text-lg font-medium w-fit">Basic Information</h3>
                                        
                                        <div class="grid gap-4">
                                            
                                            <div class="flex items-center p-3 bg-gray-50 rounded-md">
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                class="lucide lucide-user mr-3 h-5 w-5 text-gray-500">
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle></svg>
                                                    
                                                    <div className="grid grid-rows-2 justify-start">
                                                        <p class="text-sm font-medium text-gray-600 w-fit">Username</p>
                                                        
                                                        <p class="text-sm w-fit">{username}</p></div></div>
                                                        
                                                        <div class="flex items-center p-3 bg-gray-50 rounded-md">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" 
                                                            height="24" viewBox="0 0 24 24" fill="none" 
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                                            stroke-linejoin="round" 
                                                            class="lucide lucide-mail mr-3 h-5 w-5 text-gray-500">
                                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                                            
                                                            <div className="grid grid-rows-2 justify-start">
                                                            <p class="text-sm font-medium text-gray-600 w-fit">Email Address</p>
                                                            
                                                            <p class="text-sm w-fit">{useremail}</p></div></div>
                                                            
                                                            <div class="flex items-center p-3 bg-gray-50 rounded-md">
                                                            
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                                            stroke-linecap="round" stroke-linejoin="round" 
                                                            class="lucide lucide-shield mr-3 h-5 w-5 text-gray-500">
                                                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 
                                                            4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 
                                                            3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                                                            
                                                            <div className="grid grid-rows-2 justify-start"><p class="text-sm font-medium text-gray-600 w-fit">Role</p>
                                                            
                                                            <p class="text-sm capitalize w-fit">{userrole}</p></div></div>
                                                            
                                                            </div></div></div></div>
                                                                    
                                                <div class="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm ">
                                                <div class="flex flex-col space-y-1.5 p-6">
                                                    
                                                <div class="text-2xl font-semibold leading-none tracking-tight w-fit">Permissions &amp; Access</div>
                                                
                                                <div class="text-sm text-muted-foreground w-fit text-gray-500">Your current role permissions</div></div>
                                                
                                                <div class="p-6 pt-0">
                                                    
                                                { isAdmin() ?(
                                                    <div class="space-y-3">                                                    
                                                <div class="flex items-center text-green-600">
                                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                class="lucide lucide-shield mr-2 h-4 w-4">
                                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                                                1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                                                <span class="text-sm">Full system administration access</span></div>

                                                <div class="flex items-center text-green-600">
                                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                class="lucide lucide-shield mr-2 h-4 w-4">
                                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                                                1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                                                <span class="text-sm">Manage all books, members, and genres</span></div>

                                                <div class="flex items-center text-green-600">
                                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                class="lucide lucide-shield mr-2 h-4 w-4">
                                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                                                1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                                                <span class="text-sm">Delete records and manage staff</span></div>

                                                <div class="flex items-center text-green-600">
                                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                class="lucide lucide-shield mr-2 h-4 w-4">
                                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 
                                                1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                                                <span class="text-sm">Access all reports and analytics</span></div>

                                                
                                                </div>):(
                                                    <div class="p-6 pt-0">
                                                        <div class="space-y-3">
                                                            <div class="flex items-center text-blue-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                                <span class="text-sm">Manage books and members</span></div>

                                                            <div class="flex items-center text-blue-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                                <span class="text-sm">Handle borrow/return operations</span></div>
                                                            
                                                            <div class="flex items-center text-blue-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                                <span class="text-sm">View basic reports</span></div>

                                                                <div class="flex items-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="text-sm">Cannot delete records or manage genres</span></div>
                                                                
                                                                </div></div>
                                                )}
                                                
                                                </div></div></div>
  );
}


export default Profile;
