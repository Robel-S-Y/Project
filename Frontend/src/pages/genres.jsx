import { useState,useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import AddModal from "../components/AddModal";
import { useGenreStore } from "../store/genreStore";

function Genres() {
  
    const genreStore = useGenreStore((state) => state);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [id,setId]=useState(null);
    const [deletegenre,setDeleteGenre]=useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [ShowError, setShowError] = useState(false);
    const [message,setMessage]=useState('');
    const [formData, setFormData] = useState({
        name: ""
      });
    const navigate = useNavigate();

  

  const handleCreate = async (e) => {
  e.preventDefault();

  

  setError("");
  

  if (!formData.name?.trim()) {
    setError("Genre name is required");
    
    return;
  }

  const genre = await genreStore.createGenre({
    name: formData.name.trim(),
  });

  if (genre?.success) {
    setIsAddModalOpen(false);
    setRefreshTrigger(prev => prev + 1);
    setShowSuccess(true)
    setMessage(`Success! Genre ${formData.name} created successfully`)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
    }
      else
    {
      setError(genreStore.error)
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
        genreStore.getGenres();
      },[refreshTrigger]);

        const filteredGenre = genreStore.genres.filter(genre => {
    return (
      genre.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    <div class="space-y-6">
    <div class="flex justify-between items-center">
    <div><h1 class="text-3xl font-bold text-gray-900 w-fit">Genres</h1>
    <p class="text-gray-600 w-fit">Manage book genres (Admin Only)</p></div>
    <button 
    onClick={() => setIsAddModalOpen(true)}
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors cursor-pointer hover:opacity-80 bg-black text-white [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus mr-2 h-4 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Genre</button>
    </div>
    <div class="relative">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
    <input class="flex h-10 w-full rounded-md border border-gray-200 bg-white border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10" placeholder="Search genres..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

      {filteredGenre?.map((genre) => (
    <div key={genre.id} class="rounded-lg border border-white bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow">
    <div class="flex flex-col space-y-1.5 p-6 pb-3">
    <div class="flex justify-between items-center">
    
    <div class="font-semibold tracking-tight text-lg">{genre.name}</div>
    
    <div class="flex space-x-1">
      


    <button
    onClick={() => {setShowDeleteModal(true);setId(genre.id);setDeleteGenre(genre.name) }} 
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors cursor-pointer hover:bg-gray-100 border-gray-100 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
    </button>
    </div></div></div>
    <div class="p-6 pt-0"><div class="text-sm text-muted-foreground w-fit">Genre ID: {genre.id}</div>
          <div className="flex justify-end mt-4">
    <button
      onClick={() => navigate(`/genres/${genre.id}`)}
      className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80"
    >
      More
    </button>
  </div>
    </div>

    </div>))}
    </div>

                                            <DeleteModal
                                              isOpen={showDeleteModal}
                                              onClose={() => setShowDeleteModal(false)}
                                              onConfirm={() => {
                                                setShowDeleteModal(false);
                                                window.location.reload();
                                                genreStore.deleteGenre(id);
                                              }}
                                              postTitle={ deletegenre || ''}
                                            />

                                          <AddModal
                                            isOpen={isAddModalOpen}
                                            onClose={() => setIsAddModalOpen(false)}
                                            onSubmit={handleCreate}
                                            formData={formData}
                                            setFormData={setFormData}
                                          />
                                        
                                        
    </div>    </>
  );
}


export default Genres;
