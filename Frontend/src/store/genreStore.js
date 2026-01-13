import { create } from "zustand";
import api from "../utils/api";

export const useGenreStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    genres:[],
    genre:{
        id:"",
        name:""
    },

    
    createGenre: async (genre) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/genres', {name: genre.name});

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create genre' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a genre.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},


    getGenres: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/genres');
            if(response.status== 200)
                {
                    set({genres:response.data,error:null})
                    //console.log('genres:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth genres"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching genres.",
            })
        }
    },

    deleteGenre: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/genres/${id}`);
            if(response.status== 200)
                {
                    set({
                        
                        error:null
                    })
                   // console.log('genre:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to delete the genre"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the genre.",
            })
        }
    },

    getGenre: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.get(`/genres/${id}`);
            if(response.status== 200)
                {
                    set({
                        genre:{
                            id:response.data.id,
                            name:response.data.name,
                            }
                        ,error:null
                    })
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fetch the genre"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching the genre.",
            })
        }
    },

}))