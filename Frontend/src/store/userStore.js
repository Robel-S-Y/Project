import {create} from 'zustand';
import api from '../utils/api';
import Cookies from 'js-cookie';

const token =Cookies.get("access_token")
var x=false;
if(token){x=true}
    else{x=false}
export const useUserStore = create ((set) => ({
    user:null,
    isAuthenticated:x,
    error:null,
    loginerror:null,
    loading:false,

    
    login: async ({email,password})=>{
     
        try{            
            set({loading:true, loginerror:null, isAuthenticated:false,user:null});
            const response = await api.post('/auth/login',{email,password});
             let msg=response.status
             if (msg=='201')
             {
                set({
                    user:response.data.user,
                    isAuthenticated:true,
                    loginerror:null,
                })
                setTimeout(()=>{set({loading:false}) },1000)
                Cookies.set('access_token',response.data.access_token,{expires: 1,path:'/'});
                localStorage.setItem('username',response.data.user.role)
                localStorage.setItem('email',response.data.user.email)
                localStorage.setItem('role',response.data.user.role)
               return {success:true}
             }
             else{
                set({
                    loginerror:'Login failed. Please check your credentials',
                })
                setTimeout(()=>{set({loading:false}) },1000)
                return {success:false}
             }
        }
        catch(error){
         console.error("Login failed:",error?.response) 
         set({
            loginerror:error.response?.data?.message||"An error occured during login.",
            isAuthenticated:false,
            user:null
         }); 
         setTimeout(()=>{set({loading:false}) },1000) 
         return {success:false}
        }
    },
   
    
    logout: async ()=>{
        set({
        user:null,
        isAuthenticated:false,
        })
        localStorage.clear();
        Cookies.remove("access_token");
    },

    signup: async({username,email,password,role})=>{

        try{
            set({loading:true, error:null, isAuthenticated:false,user:null});
                const response = await api.post('/auth/signup',{username,email,password,role});
                let msg=response.status+' '+response.statusText
                if (msg= '201 Created')
                {
                    set({
                        user:response.data.user,
                        isAuthenticated:true,
                        error:null,
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                    Cookies.set('access_token',response.data.access_token,{expires: 1,path:'/'});
                return {success:true}
                }
                else{
                    set({
                        error:'Signup failed',
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                    return {success:false}
                }
        }
        catch(error){
            console.error("Signup failed:",error?.response) 
            set({
                error:error.response?.data?.message||"An error occured during Signup.",
                isAuthenticated:false,
                user:null
            }); 
            setTimeout(()=>{set({loading:false}) },1000) 
            return {success:false}
        }

    },

    getProfile: async() =>{
            try{
                set({loading:true,error:null})
                const response = await api.get('/auth/profile');
                if(response.status== 200)
                    {
                        set({user:response.data,error:null})
                        setTimeout(()=>{set({loading:false}) },1000)
                    }
                else{
                    setTimeout(()=>{set({loading:false}) },1000)
                    set({error:"Failed to Fecth profile"})
                }
            }
            catch(error){
                set({
                    loading:false,
                    error:error.response?.data?.message||"An error occured during fetching profile.",
                })
            }
    },


})
)