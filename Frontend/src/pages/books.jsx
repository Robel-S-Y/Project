import { useState, useEffect } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";
import {useBookStore} from '../store/bookStore'
import ViewModal from '../components/ViewModal';
import AddModal from '../components/AddModal';


function Books() {
  const bookStore = useBookStore((state) => state);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteBook,setDeleteBook]=useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [id,setId]=useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [message,setMessage]=useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    available_copies: '',
    genre_id: '',
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData,setViewData]=useState({
  title: '',
  author: '',
  published_year: '',
  available_copies: '',
  genre_id: '',
  });
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_year: "",
    available_copies: "",
    genre_id: ""
  });

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
      setMessage(`Success! Book ${editFormData.title} edited successfully`)
      setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
  }  else
    {
      setError(bookStore.error)
      setShowError(true)
      setIsEditOpen(false);
     setTimeout(() => {
      setShowError(false)
    }, 2000);
    }
    
  };

  const handleCreate = async (e) => {
  e.preventDefault();
 
  

  setError("");
  

  if (!formData.title?.trim()) {
    setError("Title is required");
    
    return;
  }

  if (!formData.author?.trim()) {
    setError("Author is required");
    
    return;
  }

  if (!formData.published_year) {
    setError("Published Year is required");
    
    return;
  }

  if (!formData.available_copies && formData.available_copies !== 0) {
    setError("Available copies is required");
    
    return;
  }

  if (!formData.genre_id?.toString().trim()) {
    setError("Genre is required");
    
    return;
  }

  const book = await bookStore.createBook({
    title: formData.title.trim(),
    author: formData.author.trim(),
    published_year: Number(formData.published_year),
    available_copies: Number(formData.available_copies),
    genre_id: Number(formData.genre_id),
  });

  if (book?.success) {
    setIsAddModalOpen(false);
    setRefreshTrigger(prev => prev + 1);
      setShowSuccess(true)
    setMessage(`Success! book ${formData.title} created successfully`)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
    }
      else
    {
      setError(bookStore.error)
      setIsAddModalOpen(false);
      setTimeout(() => {
      setShowError(true)
    }, 200);
     setTimeout(() => {
      setShowError(false)
    }, 2200);
    }
};


  useEffect(()=>{
        bookStore.getBooks();
      },[refreshTrigger]);
 
  
  const filteredBooks = bookStore.books.filter(book => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      
          {showSuccess && (
  <div className="fixed top-10 right-4 z-50 bg-green-100 text-green-800 px-4 py-2 rounded-md border border-gray-200 shadow-lg transition-opacity duration-300">
    {message}.
  </div>
)}

          {ShowError && (
  <div className="fixed top-10 right-4 z-50 bg-red-100 text-red-800 px-4 py-2 rounded-md border border-gray-200 shadow-lg transition-opacity duration-300">
    {error}.
  </div>
)}
      <div className="space-y-6"><div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 w-fit">Books</h1>
        <p className="text-gray-600">Manage your library's book collection</p>
      </div>
      <button 
      onClick={() => setIsAddModalOpen(true)}
      className="bg-black text-white inline-flex items-center 
      justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
      ring-offset-background transition-colors hover:opacity-80 hover:cursor-pointer 
      [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary 
      text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"><svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
      stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
        <path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Book</button>
      </div>
      
      <div className="relative">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        
      <input className="flex bg-white h-10 w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search books by title, author, or genre..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>

      {bookStore?.books.length>0 ?(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks?.map((book) => (
      <div key={book.id} className="rounded-lg border border-gray-200 bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6"><div className="flex justify-between items-start">
      <div className="flex-1">
      <div className="font-semibold tracking-tight text-lg w-fit">{book.title}</div>
      <div className="text-sm text-muted-foreground w-fit">{book.author}</div></div>

      {book.available_copies==0 ?(<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 bg-orange-400 text-white">
      Out of Stock</div>):(

      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 bg-black text-white focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Available</div>)}

      </div></div><div className="p-6 pt-0">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 w-fit"><span className="font-medium">Genre:</span>{book.genre.name}</p>
          <p className="text-sm text-gray-600 w-fit"><span className="font-medium">Published:</span>{book.published_year}</p>
          <p className="text-sm text-gray-600 w-fit"><span className="font-medium">Available Copies:</span>{book.available_copies}</p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">

            <button 
            onClick={() => {setShowViewModal(true); setViewData(book)}}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye h-4 w-4"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg></button>

            <button 
            onClick={() => {setEditFormData(book);
                            setId(book.id);
                            setIsEditOpen(true);}}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>
      
            <button 
            onClick={() => {setShowDeleteModal(true);setId(book.id);setDeleteBook(book.title) }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
      
      </div>
      </div>
      </div>))}
      </div>
      ):
      (

        <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Books yet
            </h3>
           
          </div>

        )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          window.location.reload();
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


          <ViewModal
      isOpen={showViewModal}
      onClose={() => setShowViewModal(false)}
      viewData={viewData}
    />

    <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        setError={setError}
      />

</div>
    </>
  );
}

export default Books; 