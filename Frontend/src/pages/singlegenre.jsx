import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { useGenreStore } from "../store/genreStore";

function SingleGenre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const genreStore = useGenreStore((state) => state);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletegenre,setDeleteGenre]=useState('');



 
  useEffect(() => {
    genreStore.getGenre(id)
  }, [id,]);

  const genre=genreStore.genre;



  return (
    <div className=" bg-gray-50 m-0 ">
      <div className="">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              to="/genres"
              className="text-gray-900 hover:text-black font-medium text-shadow-gray-500"
            >
              ← Back to Genres
            </Link>
            <div className="flex space-x-4">
               
            <button 
            onClick={() => {setShowDeleteModal(true);setDeleteGenre(genre.name) }}
            className="bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
      
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 items-center w-full">
        <div className="bg-white rounded-lg shadow-2xl w-120 h-70 justify-self-center bg-gradient-to-b  from-gray-900 to-white">
         <div className=" space-y-1.5 ">
            <div className="grid grid-cols-1">
      <div className="flex flex-row justify-between pt-3 p-2  w-full h-20  mb-3">
      <div className="font-bold tracking-tight text-4xl capitalize text-gray-200 ">Genre</div>

        </div></div></div>
      <div className="p-6 pt-0 mt-1">
        <div className="space-y-2 justify-self-center ">
          <p className="text-2xl text-gray-100 "><span className="font-medium">Genre Name:</span>{genre.name}</p>
          <p className="text-2xl text-gray-100 "><span className="font-medium">Genre Id:</span>{id}</p>
          <p className="text-sm mt-10 text-red-600 w-fit">Note: Maintain Genres up-to-date</p>
          </div>
        </div>
      </div>
      </div>

    <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          navigate('/genres')
          genreStore.deleteGenre(id);
        }}
        postTitle={ deletegenre || ''}
      />

    </div>
  );
}

export default SingleGenre; 