import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";
import { useBookStore } from '../store/bookStore';

function SingleBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookStore = useBookStore((state) => state);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBook,setDeleteBook]=useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    available_copies: '',
    genre_id: '',
  });

  // Mock data for posts
 
  useEffect(() => {
    // Simulate API call
    bookStore.getBook(id)
  }, [id,refreshTrigger]);


  const handleEdit = async (e) => {
    e.preventDefault();


     setError("");
  

  if (!editFormData.title?.trim()) {
    setError("Title is required");
    
    return;
  }

  if (!editFormData.author?.trim()) {
    setError("Author is required");
    
    return;
  }

  if (!editFormData.published_year) {
    setError("Published Year is required");
    
    return;
  }

  if (!editFormData.available_copies && editFormData.available_copies !== 0) {
    setError("Available copies is required");
    
    return;
  }

  if (!editFormData.genre_id?.toString().trim()) {
    setError("Genre is required");
    
    return;
  }

    const book = await bookStore.patchBook(id,{
    title: editFormData.title.trim(),
    author: editFormData.author.trim(),
    published_year: Number(editFormData.published_year),
    available_copies: Number(editFormData.available_copies),
    genre_id: Number(editFormData.genre_id),
  });



   if(book?.success){
      setIsEditOpen(false);
      setRefreshTrigger(prev => prev + 1);
  };
    
  };


  return (
    <div className=" bg-gray-50 m-0 ">
      <div className="">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              to="/books"
              className="text-gray-900 hover:text-black font-medium text-shadow-gray-500"
            >
              ← Back to Books
            </Link>
            <div className="flex space-x-4">
              <button 
            onClick={() => {setEditFormData(bookStore.book);
                            setIsEditOpen(true);}}
            className=" bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>
      
            <button 
            onClick={() => {setShowDeleteModal(true);setDeleteBook(bookStore.book.title) }}
            className="bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
      
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 items-center w-full">
        <div className="bg-white rounded-lg shadow-2xl w-120 h-90 justify-self-center bg-gradient-to-b  from-gray-900 to-white">
         <div className=" space-y-1.5 ">
            <div className="grid grid-cols-1">
      <div className="flex flex-row justify-between pt-3 p-2  w-full h-20  mb-3">
      <div className="font-bold tracking-tight text-4xl capitalize text-gray-200 ">{bookStore.book.title}</div>

      {bookStore.book.available_copies==0 ?(<div className="inline-flex justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 bg-orange-400/70 text-white  h-7 w-25 mt-2">
      Out of Stock</div>):(

      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 bg-black/60 text-white focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80  mt-2 h-8 w-18 ">Available</div>)}</div>

      </div></div>
      <div className="p-6 pt-0 mt-1">
        <div className="space-y-2 justify-self-center ">
        <p className="text-2xl text-gray-100 "><span className="font-medium">Author:</span>{bookStore.book.author}</p>
          <p className="text-2xl text-gray-100 "><span className="font-medium">Genre:</span>{bookStore.book.genre.name}</p>
          <p className="text-2xl text-gray-100 "><span className="font-medium">Published:</span>{bookStore.book.published_year}</p>
          <p className="text-2xl text-gray-100 "><span className="font-medium">Available Copies:</span>{bookStore.book.available_copies}</p>
          <p className="text-sm mt-10 text-red-600 w-fit">Note: Maintain Book detail up-to-date</p>
          </div>
        </div>
      </div>
      </div>

<DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          navigate('/books')
          bookStore.deleteBook(id);
        }}
        postTitle={ deleteBook || ''}
      />

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEdit}
        formData={editFormData}
        setFormData={setEditFormData}
        setError={setError}
      />

    </div>
  );
}

export default SingleBook; 