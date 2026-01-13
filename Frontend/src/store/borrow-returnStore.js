import { create } from "zustand";
import api from "../utils/api";

export const useBorrow_returnStore = create ((set) =>({
    loading:false,
    saving:false,
    error:null,
    borrow_records:[],
    borrow_records_overdue:[],
    popular_genres:[],
    summary:[],
    borrow:{},

    
    Borrow: async (borrow) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/borrow-records/borrow', {
        book_id: borrow.book_id,
        member_id: borrow.member_id,
        due_date: borrow.due_date

    });

    if (response.status === 201) {
      setTimeout(() => set({ loading: false }), 1000);
      set({ error: null });
      return { success: true };
    } else {
      set({ error: 'Failed to create borrow' });
      setTimeout(() => set({ loading: false }), 1000);
      return { success: false };
    }
  } catch (error) {
    console.error('creating failed:', error?.response);
    set({
      error: error.response?.data?.message || 'An error occurred during creating a borrow.',
    });
    setTimeout(() => set({ loading: false }), 1000);
    return { success: false };
  }
},

    return: async (borrow_id) => {
  try {
    set({ loading: true, error: null });

    const response = await api.post('/borrow-records/return', {
      borrow_record_id: borrow_id,
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


    getBorrows: async() =>{
        try{
            set({loading:true,error:null})
            const response = await api.get('/borrow-records');

            if(response.status== 200)
                {
                    set({borrow_records:response.data,error:null})
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

    getBorrows_overdue: async() =>{
    try{
        set({loading:true,error:null})
        const response = await api.get('/borrow-records/reports/overdue');

        if(response.status== 200)
            {
                set({borrow_records_overdue:response.data,error:null})
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

    getPopular: async() =>{
    try{
        set({loading:true,error:null})
        const response = await api.get('/borrow-records/reports/popular-genres');

        if(response.status== 200)
            {
                set({popular_genres:response.data,error:null})
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

    getSummary: async() =>{
    try{
        set({loading:true,error:null})
        const response = await api.get('/borrow-records/reports/summary');

        if(response.status== 200)
            {
                set({summary:response.data,error:null})
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

    getBorrow: async(id) =>{
        try{
            set({loading:true,error:null})
            const response = await api.get(`/borrow-records/${id}`);
            if(response.status== 200)
                {
                    set({
                        borrow:{
                            id:response.data.id,
                            book_id:response.data.id,
                            member_id:response.data.member_id,
                            borrow_date:response.data.borrow_date,
                            due_date:response.data.due_date,
                            return_date:response.data.return_date,
                            book: {
                                id:response.data.book.id,
                                title:response.data.book.title,
                                author:response.data.book.author,
                                published_year:response.data.book.published_year,
                                available_copies:response.data.book.available_copies,
                                genre_id: response.data.book.genre_id,
                                genre: {
                                id: response.data.book.genre.id,
                                name:response.data.book.genre.name
                                }
                            },
                            member: {
                                id: response.data.member.id,
                                name: response.data.member.name,
                                email: response.data.member.email,
                                phone: response.data.member.phone,
                                join_date: response.data.member.join_date
                            }
                        }
                        ,error:null
                    })
                   // console.log('post:',response.data.title)
                    setTimeout(()=>{set({loading:false}) },1000)
                }
            else{
                setTimeout(()=>{set({loading:false}) },1000)
                set({error:"Failed to Fetch the borrow"})
            }
        }
        catch(error){
            set({
                loading:false,
                error:error.response?.data?.message||"An error occured during fetching the borrow.",
            })
        }
    },

}))