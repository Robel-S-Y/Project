import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBorrow_returnStore } from "../store/borrow-returnStore";



function Reports() {
  const borrow_returnStore = useBorrow_returnStore((state) => state);


      useEffect(()=>{
        borrow_returnStore.getBorrows_overdue();
      },[]);

          useEffect(()=>{
        borrow_returnStore.getPopular();
      },[]);

          useEffect(()=>{
        borrow_returnStore.getSummary();
      },[]);



    const maxCount = Math.max(...borrow_returnStore.popular_genres.map(popular => popular.borrow_count));


  return (
  

  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 w-fit">Reports</h1>
      <p className="text-gray-600 w-fit">Library analytics and reports</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="rounded-lg boder border-gray-200 bg-white text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-triangle-alert mr-2 h-5 w-5 text-red-500">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
              Overdue Books</div>
              <div className="text-sm text-muted-foreground w-fit text-gray-600">Books that are past their due date</div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">

                  {borrow_returnStore.borrow_records_overdue?.map((overdue) => (
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div><p className="font-medium w-fit">{overdue.book.title}</p>
                  <p className="text-sm text-gray-600 w-fit">Member: {overdue.member.neame}</p>
                  <p className="text-sm text-gray-600 w-fit">Due: {overdue.due_date}</p></div>
                  <div className="inline-flex items-center rounded-full boder border-gray-200 px-2.5 py-0.5 text-xs font-semibold 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                  boder border-gray-200-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80">
                    {Math.floor((new Date() - new Date(overdue.due_date)) / (1000 * 60 * 60 * 24))} days overdue</div>
                    </div>
                  ))}

                    </div></div></div>

                      <div className="rounded-lg boder border-gray-200 bg-white text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">

                          <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                            stroke-linecap="round" stroke-linejoin="round" 
                            className="lucide lucide-trending-up mr-2 h-5 w-5 text-green-500">
                              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                              <polyline points="16 7 22 7 22 13"></polyline></svg>Popular Genres</div>
                              <div className="text-sm text-muted-foreground w-fit text-gray-600">Most borrowed book genres</div></div>

                              {borrow_returnStore.popular_genres?.map((popular,index) => (
                              <div key={index} className="p-6 pt-0">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm font-medium text-gray-500"># {index+1} </span>
                                  <span className="font-medium">{popular.genre_name}</span></div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(popular.borrow_count / maxCount) * 100}%` }} ></div></div>
                                      <span className="text-sm text-gray-600">{popular.borrow_count}</span></div></div>
                                      </div></div>
                              ))}
                                      </div></div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                        <div className="rounded-lg boder border-gray-200 bg-white text-card-foreground shadow-sm">
                                          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                            <div className="tracking-tight text-sm font-medium">Total Borrows This Month</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                            className="lucide lucide-chart-column h-4 w-4 text-muted-foreground"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                                            <path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg></div>
                                            <div className="p-6 pt-0"><div className="text-2xl font-bold w-fit">{borrow_returnStore.summary.totalBorrowsThisMonth}</div></div></div>

                                            <div className="rounded-lg boder border-gray-200 bg-white text-card-foreground shadow-sm">
                                              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                                <div className="tracking-tight text-sm font-medium">Average Borrow Duration</div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                className="lucide lucide-chart-column h-4 w-4 text-muted-foreground"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                                                <path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg></div><div className="p-6 pt-0">
                                                  <div className="text-2xl font-bold w-fit">{borrow_returnStore.summary.averageBorrowDuration}</div></div></div>

                                                  <div className="rounded-lg boder border-gray-200 bg-white text-card-foreground shadow-sm">
                                                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                                      <div className="tracking-tight text-sm font-medium">Return Rate</div>
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                                      className="lucide lucide-chart-column h-4 w-4 text-muted-foreground"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                                                      <path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg></div>
                                                      <div className="p-6 pt-0"><div className="text-2xl font-bold w-fit">{borrow_returnStore.summary.returnRate}%</div></div></div></div></div>
  

  );
}


export default Reports;
