import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";
import BorrowHistoryModal from "../components/BorrowHistoryModal";
import { useMemberStore } from "../store/memberStore";

function SingleMember() {
    const { id } = useParams();
    const navigate = useNavigate();
    const memberStore = useMemberStore((state) => state);
    const [error, setError] = useState('');
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMember,setDeleteMember]=useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

 
 
  useEffect(() => {
    memberStore.getMember(id)
  }, [id,refreshTrigger]);

  const member=memberStore.member


  const handleEdit = async (e) => {
    e.preventDefault();


     setError("");
  

  if (!editFormData.name?.trim()) {
    setError("Name is required");
    
    return;
  }

  if (!editFormData.email?.trim()) {
    setError("Email is required");
    
    return;
  }

  if (!editFormData.phone) {
    setError("Phone Number is required");
    
    return;
  }

    const member = await memberStore.patchMember(id,{
    name: editFormData.name.trim(),
    email: editFormData.email.trim(),
    phone: editFormData.phone.trim()
  });



   if(member?.success){
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
              to="/members"
              className="text-gray-900 hover:text-black font-medium text-shadow-gray-500"
            >
              ← Back to Members
            </Link>
            <div className="flex space-x-4">

            <button onClick={() => {
                                        memberStore.getHistory(id)
                                        setIsHistoryOpen(true);
                                        }}
                        class="bg-white shadow-md border-gray-200 hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background 
                        hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history h-4 w-4">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>
                        <path d="M12 7v5l4 2"></path></svg></button>
              <button 
            onClick={() => {setEditFormData(member);
                            setIsEditOpen(true);}}
            className=" bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg></button>
      
            <button 
            onClick={() => {setShowDeleteModal(true);setDeleteMember(member.name) }}
            className="bg-white shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors hover:bg-gray-200 hover:cursor-pointer [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
      
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 items-center w-full">
        <div className="bg-white rounded-lg shadow-2xl w-120 h-90 justify-self-center bg-gradient-to-b  from-gray-900 to-white">
         <div className=" space-y-1.5 ">
            <div className="grid grid-cols-1">
      <div className="flex flex-row  pt-3 p-2 w-full h-20  mb-3">
      <div className="font-bold tracking-tight text-4xl capitalize text-gray-200 justify-self-center ">Member</div></div>

      </div></div>
      <div className="p-6 pt-0 mt-1">
        <div className="space-y-2 justify-self-center ">
        <p className="text-xl text-gray-100 justify-self-start"><span className="font-medium text-2xl mr-2">Member:</span>{member.name}</p>
          <p className="text-xl text-gray-100 justify-self-start"><span className="font-medium text-2xl mr-2">Email:</span>{member.email}</p>
          <p className="text-xl text-gray-100 justify-self-start"><span className="font-medium text-2xl mr-2">Phone Number:</span>{member.phone}</p>
          <p className="text-xl text-gray-100 justify-self-start"><span className="font-medium text-2xl mr-2">Joined:</span>{member.join_date}</p>
          <p className="text-sm mt-10 text-red-500 w-fit justify-self-center">Note: Admin could only view Members!</p>
          </div>
        </div>
      </div>
      </div>

        <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
            setShowDeleteModal(false);
            window.location.reload();
            memberStore.deleteMember(id);
        }}
        postTitle={ deleteMember || ''}
        />

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEdit}
        formData={editFormData}
        setFormData={setEditFormData}
        setError={setError}
      />
        <BorrowHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyData={memberStore.history}
        />

    </div>
  );
}

export default SingleMember; 