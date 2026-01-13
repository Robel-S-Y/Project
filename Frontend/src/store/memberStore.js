import { create } from "zustand";
import api from "../utils/api";

const isoDateOnly=new Date().toISOString().split('T')[0];

export const useMemberStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    members:[],
    historyMap: {},
    history:[],
    member:{
        name: "",
        email: "",
        phone: "",
        },
    
    createMember: async (member) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/members', {
      name: member.name,
      email: member.email,
      phone: member.phone,
      join_date: isoDateOnly,
    });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create member' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a member.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},


    getMembers: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/members');
            if(response.status== 200)
                {
                    set({members:response.data,error:null})
                    //console.log('members:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth members"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching members.",
            })
        }
    },

     patchMember: async(id,member) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/members/${id}`,{
        name: member.name,
        email: member.email,
        phone: member.phone
    });
            if(response.status== 200)
                {
                    set({error:null})
                   // console.log('member updated to:')
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch members"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the member.",
            })
            return {success:false};
        }
    },

    deleteMember: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/members/${id}`);
            if(response.status== 200)
                {
                    set({
                        
                        error:null
                    })
                   // console.log('member:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to delete the member"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the member.",
            })
        }
    },

    getHistory: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.get(`/members/${id}/borrowing-history`);
            if(response.status== 200)
                {
                    set({history:response.data,error:null})
                    set((state) => ({
                                    historyMap: {
                                        ...state.historyMap,
                                        [memberId]: res.data, 
                                    },
                                    }));
                    //console.log('members:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to fetch borrow history"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching borrow history.",
            })
        }
    },

    getMember: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.get(`/members/${id}`);
            if(response.status== 200)
                {
                    set({
                        member:{
                            name: response.data.name,
                            email: response.data.email,
                            phone: response.data.phone,
                            join_date: response.data.join_date
                            },
                            error:null
                        })
                    //console.log('post:',response.data.title)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fetch the book"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching the book.",
            })
        }
    },

}))