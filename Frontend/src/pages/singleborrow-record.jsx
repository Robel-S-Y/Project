import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBorrow_returnStore } from "../store/borrow-returnStore";


function Singleborrow_return() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const borrow_returnStore = useBorrow_returnStore((state) => state);
    const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    borrow_returnStore.getBorrow(id)
  }, [id,refreshTrigger]);

const borrow=borrow_returnStore.borrow;
const borrowed_book=borrow.book;
const borrower_member=borrow.member;




  return (
    <div className=" bg-gray-50 m-0 ">
      <div className="">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              to="/borrow-return"
              className="text-gray-900 hover:text-black font-medium text-shadow-gray-500"
            >
              ← Back to Borrow/Return
            </Link>
            <div className="flex space-x-4">    
            {!borrow.return_date &&( <button 
            onClick={() => {borrow_returnStore.return(Number(id)); setRefreshTrigger(prev => prev + 1);}}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Mark as Returned</button>)}
                

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 items-center w-full">
        <div className="w-fit h-fit rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm p-4">
         <div className=" space-y-1.5 ">
            <div className="grid grid-cols-1">
      <div className="flex flex-row justify-between pt-3 p-2  w-full h-20  mb-3">
      <div className="font-bold tracking-tight text-4xl capitalize text-black ">Borrowed Book Details:</div>
                  {borrow?.due_date<=today && !borrow?.return_date?(
            <div className="h-fit w-fit inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold 
            transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
            border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-orange-700 text-white hover:opacity-80">
            Overdue</div>
            )
            :

            borrow?.return_date? (<div className="h-fit w-fit inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold 
            transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
            border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-gray-200 text-black hover:opacity-80">
            Returned</div>):

            (<div className="inline-flex items-center h-fit w-fit rounded-md border px-2.5 py-0.5 text-sm font-semibold 
            transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
            border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-black text-white hover:opacity-80">
            Active</div>)}
        </div></div></div>
      <div className="p-6 pt-0 mt-1 grid grid-cols-2">
        
        <div className="space-y-2 justify-self-start ">
            <h2 className="text-2xl text-black w-fit">Borrowed Book</h2>  
          <p className="md:text-xl text-sm text-black w-fit "><span className="font-medium">Title:</span>{borrowed_book?.title}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Author:</span>{borrowed_book?.author}</p>
          <p className="md:text-xl text-sm text-black w-fit "><span className="font-medium">Genre:</span>{borrowed_book?.genre.name}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Published:</span>{borrowed_book?.published_year}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Available Copies:</span>{borrowed_book?.available_copies}</p></div>
                    
            <div className="space-y-2 justify-self-start w-fit  ">
                <h2 className="text-2xl text-black w-fit ">Borrowed By</h2>  
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Member Name:</span>{borrower_member?.name}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Member Email:</span>{borrower_member?.email}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Member phone:</span>{borrower_member?.phone}</p>
          <p className="md:text-xl text-sm text-black w-fit"><span className="font-medium">Joined:</span>{borrower_member?.join_date}</p>
          </div>       
        </div>

            <div>
            <hr className='bg-gray-400 text-gray-200'/>
            <div className="flex justify-between md:ml-30 md:mr-30 mr-10 ml-10 m-3">
            <div className="flex items-center  text-gray-600 text-sm md:text-lg"><svg xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4">
            <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path></svg>
            <div className='flex'><span className="font-medium mr-0.5">Borrowed: </span>{borrow?.borrow_date}</div></div>

            <div className="flex items-center text-gray-600 text-sm md:text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" 
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
            stroke-linejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4">
            </path><rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path></svg>
            <div className="flex"><span className="font-medium mr-0.5">Due:</span>{borrow?.due_date}</div></div></div>
            </div>
      </div>
      </div>


    </div>
  );
}

export default Singleborrow_return; 