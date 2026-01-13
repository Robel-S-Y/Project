import { create } from "zustand";
import api from "../utils/api";

export const useStaffStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    staffs:[],
    staff:{
            username: "",
            email: "",
            password: "",
            role: ""
        },
    
  
     createStaff: async (staff) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/staff', {
      username: staff.username,
      email: staff.email,
      password: staff.password,
      role: staff.role
    });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: `Failed to create staff ${staff.username}` });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || `An error occurred during creating staff ${staff.username}.`,
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},


    getStaffs: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/auth/users');
            if(response.status== 200)
                {
                    set({staffs:response.data.users,error:null})
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth staffs"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching staffs.",
            })
        }
    },

     patchStaff: async(id,staff) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/staff/${id}`,{
            username: staff.username,
            email: staff.email,
            password: staff.password,
            role: staff.role
    });
            if(response.status== 200)
                {
                    set({error:null})
                   // console.log('staff updated to:')
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch staffs"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the staff.",
            })
            return {success:false};
        }
    },

    deleteStaff: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/staff/${id}`);
            if(response.status== 200)
                {
                    set({
                        
                        error:null
                    })
                   // console.log('staff:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to delete the staff"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the staff.",
            })
        }
    },
}))