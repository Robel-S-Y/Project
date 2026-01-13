import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from '../components/DeleteModal';
import EditModal from "../components/EditModal";
import ViewModal from "../components/ViewModal";
import { useStaffStore } from "../store/staffStore";
import AddModal from '../components/AddModal';


function Staff() {
    const staffStore = useStaffStore((state) => state);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [id,setId]=useState(null);
    const [error, setError] = useState('');
    const [deleteStaff, setDeleteStaff] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [ShowError, setShowError] = useState(false);
    const [message,setMessage]=useState('');
      const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  });
    const [editFormData, setEditFormData] = useState({
      username: "",
      email: "",
      password: "",
      role: "librarian",
    });
    const [viewData,setViewData]=useState({
      username: "",
      email: "",
      password: "",
      role: "librarian",
  });

  const handleEdit = async (e) => {
    e.preventDefault();


     setError("");
  

  if (!editFormData.username?.trim()) {
    setError("username is required");
    
    return;
  }

  if (!editFormData.email?.trim()) {
    setError("email is required");
    
    return;
  }

  if (!editFormData.password?.trim()) {
    setError("password Year is required");
    
    return;
  }

  if (!editFormData.role?.trim) {
    setError("Role is required");
    
    return;
  }

    const staff = await staffStore.patchStaff(id,{
    username: editFormData.username,
    email: editFormData.email,
    password: editFormData.password,
    role: editFormData.role
  });



   if(staff?.success){
      setIsEditOpen(false);
      setRefreshTrigger(prev => prev + 1);
      setMessage(`Success! Staff ${editFormData.username} edited successfully`)
      setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
  }
  else
    {
      setError(staffStore.error)
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
  

  if (!formData.username?.trim()) {
    setError("Username is required");
    
    return;
  }

  if (!formData.email?.trim()) {
    setError("Email is required");
    
    return;
  }

  if (!formData.role?.trim()) {
    setError("role is required");
    
    return;
  }

  if (!formData.password?.trim()) {
    setError("password is required");
    
    return;
  }

  if (!formData.confirmPassword?.trim()) {
    setError("Confirm your password.");
    
    return;
  }

      // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      //setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
     //setIsLoading(false);
      return;
    }

  const staff = await staffStore.createStaff({
    username: formData.username.trim(),
    email: formData.email.trim(),
    role: formData.role,
    password: formData.password
  });

  if (staff?.success) {
    setIsAddModalOpen(false);
    setRefreshTrigger(prev => prev + 1);
      setShowSuccess(true)
    setMessage(`Success! Staff ${formData.title} created successfully`)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
    }
      else
    {
      setError(staffStore.error)
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
        staffStore.getStaffs();
      },[refreshTrigger]);

  const filteredStaffs = staffStore.staffs.filter(staff => {
    return (
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.username.toLowerCase().includes(searchQuery.toLowerCase()) 
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
        <div>
          <h1 class="text-3xl font-bold text-gray-900 w-fit">Staff Management</h1>
          <p class="text-gray-600">Manage library staff and administrators (Admin Only)</p></div> 
                <button 
      onClick={() => setIsAddModalOpen(true)}
      className="bg-black text-white inline-flex items-center 
      justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
      ring-offset-background transition-colors hover:opacity-80 hover:cursor-pointer 
      [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary 
      text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"><svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
      stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
        <path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Staff</button>           
            </div>

            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
              class="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4">
                <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                
                <input class="bg-white flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 
                text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                md:text-sm pl-10 border-gray-200" placeholder="Search staff by username, email, or role..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredStaffs.map((staff) => (
                  <div class="rounded-lg border bg-white text-card-foreground shadow-sm hover:shadow-md 
                  transition-shadow border-gray-200">
                    <div class="flex flex-col space-y-1.5 p-6">
                    <div class="flex justify-between items-start"><div class="flex-1">

                      <div class="font-semibold tracking-tight text-lg flex items-center">

                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-shield mr-2 h-5 w-5 text-red-500">
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 
                          1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                          </svg>
                          
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2 h-5 w-5 text-blue-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          
                          {staff.username}</div>

                          
                          </div>
                          
                          <div class="flex flex-col space-y-1">

                           {staff.role=="admin"?( <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                            transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent 
                            bg-destructive text-destructive-foreground hover:bg-destructive/80 bg-orange-500 text-white hover:opacity-80 uppercase">{staff.role}</div>):

                            (<div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                            transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent 
                            bg-destructive text-destructive-foreground hover:bg-destructive/80 bg-black text-white hover:opacity-80 uppercase">{staff.role}</div>)}
                        
                            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors 
                            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent 
                            bg-primary text-primary-foreground hover:bg-primary/80 text-xs bg-black text-white hover:opacity-80">ACTIVE</div>
                            </div></div></div>
                            <div class="p-6 pt-0">
                              <div class="space-y-2">
                                <p class="text-sm text-gray-600 w-fit"><span class="font-medium">Role:</span>{staff.role}</p></div>
                                
                                <div class="flex justify-end space-x-2 mt-4">
                                  
                                  <button 
                                  onClick={() => {setShowViewModal(true); setViewData(staff)}}
                                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm 
                                  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                  [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-gray-200 hover:bg-gray-200 cursor-pointer border-input bg-background 
                                  hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg" 
                                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                  stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye h-4 w-4">
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 
                                    0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg></button>

                                    <button 
                                    onClick={() => {
                                              setEditFormData({
                                                username: staff.username,
                                                email: "",
                                                password: "",
                                                role: staff.role,
                                              });
                                              setIsEditOpen(true);
                                              setId(staff.id)
                                            }}
                                    class=" border-gray-200 hover:bg-gray-200 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                                    [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background 
                                    hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"><svg xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                                     stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4">
                                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 
                                      2 0 0 1 .506-.852z"></path></svg></button>
                                      
                                      <button 
                                      onClick={() => {setShowDeleteModal(true); setId(staff.id);setDeleteStaff(staff.username)}}
                                      class=" border-gray-200 hover:bg-gray-200 cursor-pointer inline-flex items-center justify-center 
                                      gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none 
                                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                                      disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border 
                                      border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                        class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
                                        </div></div>
                                        </div>
                                          ))}
                                        </div>
                                        
                                        <DeleteModal
                                          isOpen={showDeleteModal}
                                          onClose={() => setShowDeleteModal(false)}
                                          onConfirm={() => {
                                            setShowDeleteModal(false);
                                            window.location.reload();
                                            staffStore.deleteStaff(id);
                                          }}
                                          postTitle={ deleteStaff || ''}
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
                                                  setError={setError}
                                                />
                                        
                                        </div>
  );
}


export default Staff;
