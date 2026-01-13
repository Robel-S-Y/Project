import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";
import ViewModal from "../components/ViewModal";
import AddModal from "../components/AddModal";
import BorrowHistoryModal from "../components/BorrowHistoryModal";
import { useMemberStore } from "../store/memberStore";



function Members() {
  
    const memberStore = useMemberStore((state) => state);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [message,setMessage]=useState('');
    const [ShowError, setShowError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [error, setError] = useState('');
    const [id,setId]=useState(null);
    const [deleteMember,setDeleteMember]=useState('');
    const [viewData,setViewData]=useState({
            name: '',
            email: '',
            phone: '',
            join_date: '',
            active_borrows:''
            });
    const [editFormData, setEditFormData] = useState({
      name: "",
      email: "",
      phone: "",
    });

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
       setMessage(`Success! Member ${editFormData.username} edited successfully`)
      setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
  }
  else
    {
      setError(memberStore.error)
      setShowError(true)
      setIsEditOpen(false);
     setTimeout(() => {
      setShowError(false)
    }, 2000);
    }
  };

;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

 const handleCreate = async (e) => {
  e.preventDefault();

  

  setError("");
  

  if (!formData.name?.trim()) {
    setError("Name is required");
    
    return;
  }

  if (!formData.email?.trim()) {
    setError("Email is required");
    
    return;
  }

  if (!formData.phone) {
    setError("Phone Number is required");
    
    return;
  }


  const member = await memberStore.createMember({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim()
  });

  if (member?.success) {
    setIsAddModalOpen(false);
    setRefreshTrigger(prev => prev + 1);
    setShowSuccess(true)
    setMessage(`Member ${formData.name} created successfully`)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
    }
          else
    {
      setError(memberStore.error)
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
        memberStore.getMembers();
      },[refreshTrigger]);
 
  
  const filteredMembers = memberStore.members.filter(member => {
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });



  
  
  return (
    
    <div class="space-y-6">

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


      <div class="flex justify-between items-center">
        <div><h1 class="text-3xl font-bold text-gray-900 w-fit">Members</h1>
        <p class="text-gray-600">Manage library members</p></div>

        <button
        onClick={() => setIsAddModalOpen(true)} 
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap 
        rounded-md text-sm font-medium ring-offset-background transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
         [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary 
         text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white cursor-pointer hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
          class="lucide lucide-plus mr-2 h-4 w-4"><path d="M5 12h14"></path>
          <path d="M12 5v14"></path></svg>Add Member</button>
          
          </div>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4">
              <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base 
              ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
              file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
              md:text-sm pl-10 bg-white border-gray-200" placeholder="Search members by name, email, or phone..."
               value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/></div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers?.map((member) => (
                <div class="rounded-lg border border-gray-200 border-gr bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex flex-col space-y-1.5 p-6"><div class="flex justify-between items-start">
                    <div class="flex-1"><div class="font-semibold tracking-tight text-lg w-fit">{member.name}</div>
                    <div class="text-sm text-muted-foreground w-fit text-gray-600">{member.email}</div></div>
                    </div></div>
                    <div class="p-6 pt-0">
                      <div class="space-y-2">
                        <p class="text-sm text-gray-600 w-fit">
                        <span class="font-medium">Phone:</span>{member.phone}</p>
                        <p class="text-sm text-gray-600 w-fit"><span class="font-medium">Joined:</span>{member.join_date}</p>
                        </div>
                        <div class="flex justify-end space-x-2 mt-4">
                          
                          <button onClick={() => {setShowViewModal(true); setViewData(member)}} 
                          class="border-gray-200 hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm 
                          font-medium ring-offset-background transition-colors focus-visible:outline-none 
                          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                          disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none 
                          [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background 
                          hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                            stroke-linejoin="round" class="lucide lucide-eye h-4 w-4">
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                              <circle cx="12" cy="12" r="3"></circle></svg></button>

                              <button onClick={() => {
                                                memberStore.getHistory(member.id)
                                                setIsHistoryOpen(true);
                                              }}
                              class="border-gray-200 hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
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
                                                setId(member.id);
                                                setIsEditOpen(true);}}
                                class="border-gray-200 hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center gap-2 
                                whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
                                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border 
                                border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                  class="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2
                                   0 0 1 .506-.852z"></path></svg></button>

                                   <button 
                                   onClick={() => {setShowDeleteModal(true);setId(member.id);setDeleteMember(member.name) }}
                                   class="border-gray-200 hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                   ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                   focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                   [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background 
                                   hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" 
                                   width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                   stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path>
                                   <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                   <line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>

                                   </div></div></div>
              ))}
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
                                          />

                                          <BorrowHistoryModal
                                            isOpen={isHistoryOpen}
                                            onClose={() => setIsHistoryOpen(false)}
                                            historyData={memberStore.history}
                                          />


                                        
                                   </div>

  );
}


export default Members;
