import { create } from "zustand";
import api from "../utils/api";

export const useBookStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    books:[],
    book:{
            id: null,
            title: null,
            author: null,
            published_year: null,
            available_copies: null,
            genre_id: null,
            genre: {
            id: null,
            name:null
            }
        },
    
    createBook: async (book) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/books', {
      title: book.title,
      author: book.author,
      published_year: book.published_year,
      available_copies: book.available_copies,
      genre_id: book.genre_id,
    });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create book' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a book.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},


    getBooks: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/books');
            if(response.status== 200)
                {
                    set({books:response.data,error:null})
                    //console.log('books:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fecth books"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching books.",
            })
        }
    },

     patchBook: async(id,book) =>{
        try{
            set({saving:true,error:null})
            const response = await api.patch(`/books/${id}`,{
      title: book.title,
      author: book.author,
      published_year: book.published_year,
      available_copies: book.available_copies,
      genre_id: book.genre_id,
    });
            if(response.status== 200)
                {
                    set({error:null})
                    setTimeout(()=>{set({saving:false}) },1000)
                    return {success:true};
                }
            else{
                setTimeout(()=>{set({saving:false}) },1000)
                set({error:"Failed to Fetch books"})
                return {success:false};
            }
        }
        catch(error){
            set({
                saving:false,
                error:error.response?.data?.message||"An error occured during fetching the book.",
            })
            return {success:false};
        }
    },

    deleteBook: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.delete(`/books/${id}`);
            if(response.status== 200)
                {
                    set({
                        
                        error:null
                    })
                    //console.log('book:',response.data)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to delete the book"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during deletion of the book.",
            })
        }
    },

    getBook: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.get(`/books/${id}`);
            if(response.status== 200)
                {
                    set({
                        book:{
                            id:response.data.id,
                            title:response.data.title,
                            author: response.data.author,
                            published_year: response.data.published_year,
                            available_copies: response.data.available_copies,
                            genre_id: response.data.genre_id,
                            genre: {
                            id: response.data.genre.id,
                            name:response.data.genre.name
                            }
                        }
                        ,error:null
                    })
                   // console.log('post:',response.data.title)
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