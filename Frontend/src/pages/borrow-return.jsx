import { useState,useEffect } from "react";
import BorrowModal from "../components/BorrowModal";
import { useBorrow_returnStore } from "../store/borrow-returnStore";
import { useNavigate, useLocation } from 'react-router-dom';


function Borrow_return() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const borrow_returnStore = useBorrow_returnStore((state) => state);
    const today = new Date().toISOString().split('T')[0];
    const [isBorrowOpen, setIsBorrowOpen] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

  const handleBorrowSubmit = async (borrowData) => { 
      const borrow = await borrow_returnStore.Borrow({
    book_id: Number(borrowData.book_id),
    member_id: Number(borrowData.member_id),
    due_date: borrowData.due_date,
  });

  if (borrow?.success) {
    setIsBorrowOpen(false);
    setRefreshTrigger(prev => prev + 1);
    }
  };


  const search=searchQuery.toLowerCase();

    useEffect(()=>{
        borrow_returnStore.getBorrows();
      },[refreshTrigger]);

const filteredBorrows = borrow_returnStore.borrow_records?.filter((borrow) => {
    return (
      borrow.book.title.toLowerCase().includes(search) ||
      borrow.book.author.toLowerCase().includes(search) ||
      (search === "returned" && borrow.return_date) ||
      (search === "active" && !borrow.return_date && borrow.due_date > today) ||
      (search === "overdue" && !borrow.return_date && borrow.due_date < today)
    );
});

  return (
    
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 w-fit">Borrow &amp; Return</h1>
          <p className="text-gray-600 w-fit">Manage book borrowing and return operations</p>
        </div>
        <div className="flex space-x-2">

          <button 
          onClick={() => setIsBorrowOpen(true)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm 
          font-medium ring-offset-background transition-colors [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
          hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white hover:opacity-80 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-arrow-left-right mr-2 h-4 w-4"><path d="M8 3 4 7l4 4"></path>
            <path d="M4 7h16"></path><path d="m16 21 4-4-4-4"></path><path d="M20 17H4"></path></svg>
            Borrow Book</button>
            

              </div></div>

                    <div className="relative">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        
      <input className="flex bg-white h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search borrows by book name/author/genre, by member, and by returned/overdue/active" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
              
              <div className="grid gap-4">
                  {filteredBorrows?.map((borrow) => (
                <div key={borrow.id} 
                className="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="capitalize font-semibold tracking-tight text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                      className="lucide lucide-book-open mr-2 h-5 w-5"><path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 
                      1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                      
                      {borrow.book.title}</div>

                      <div className="text-sm text-muted-foreground flex items-center mt-1 w-fit text-gray-600 capitalize">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        className="lucide lucide-user mr-2 h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle></svg>
                        
                        {borrow.book.author}</div></div>

                        {borrow.due_date<=today && !borrow.return_date?(
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-orange-700 text-white hover:opacity-80">
                          Overdue</div>
                          )
                          :
                          
                        borrow.return_date? (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-gray-200 text-black hover:opacity-80">
                          Returned</div>):
                          
                          (<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        border-transparent bg-primary text-primary-foreground hover:bg-primary/80   bg-black text-white hover:opacity-80">
                          Active</div>)}
                          
                          </div></div>

                        <div className="p-6 pt-0"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-sm text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" 
                          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                          stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4">
                            <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path></svg><div><span className="font-medium">
                              
                              Borrowed:</span><br/>{borrow.borrow_date}</div></div>

                            <div className="flex items-center text-sm text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" 
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                            stroke-linejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4">
                              </path><rect width="18" height="18" x="3" y="4" rx="2"></rect>
                              <path d="M3 10h18"></path></svg><div className="relative"><span className="font-medium absolute left-0">
                                
                                Due:</span><br/>{borrow.due_date}</div></div></div>
                              <div className="flex justify-between">
                              <div className="mt-4 w-fit">
                                
                               {!borrow.return_date &&( <button 
                                onClick={() => {borrow_returnStore.return(borrow.id); window.location.reload();}}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground 
                                 hover:bg-primary/90 h-9 rounded-md px-3 bg-black text-white hover:opacity-80 cursor-pointer">Mark as Returned</button>)}
                                 </div>

                                    <div className="flex justify-end ">
                                    <button
                                      onClick={() => navigate(`/borrow-return/${borrow.id}`)}
                                      className="rounded-md bg-black px-4 py-2 h-9 text-sm text-white hover:opacity-80"
                                    >
                                      More
                                    </button>
                                  </div>
                                 </div>
                                 </div></div>
                                 ))}
                                 </div>
                                 
      <BorrowModal
        isOpen={isBorrowOpen}
        onClose={() => setIsBorrowOpen(false)}
        onSubmit={handleBorrowSubmit}
      />

                                 </div>

  );
}


export default Borrow_return;
