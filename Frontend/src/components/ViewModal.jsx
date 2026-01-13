import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


export default function ViewModal({ isOpen, onClose, viewData }) {
  const location = useLocation();
  const locationname = location.pathname.replace("/", "");

  const isStaff = () => location.pathname === "/staff";
  const isBooks = () => location.pathname === "/books";
  const isGenres = () => location.pathname === "/genres";

  const navigate = useNavigate();

const handleMoreClick = () => {
  if (!viewData?.id) return;
  const basePath = isBooks() ? "books" : isStaff() ? "staff" : isGenres() ? "genres" : "members";
  navigate(`/${basePath}/${viewData.id}`);
};


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold capitalize">
            {viewData?.name || viewData?.title || viewData?.username}
          </h2>
          <p className="text-sm text-gray-600">
            {isBooks() ? "Book" : isStaff() ? "Staff Member" : "Member"} Details
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-4 py-4">
          {isBooks() && (
            <>
              <Row label="Author" value={viewData.author} />
              <Row label="Genre" badge={viewData.genre.name} />
              <Row label="Published" value={viewData.published_year} />
              <Row label="Available" badge={`${viewData.available_copies} copies`} />
              <Row label="Status" badge={viewData.available_copies > 0 ? "Available" : "Unavailable"} />
            </>
          )}

          {isStaff() && (
            <>
              <Row label="Username" value={viewData.username} icon="user" />
              <Row label="Role" badge={viewData.role?.toUpperCase()} icon="shield" badgeType="destructive" />
            </>
          )}

          {!isBooks() && !isStaff() && (
            <>
              <Row label="Name" value={viewData.name} />
              <Row label="Email" value={viewData.email}  />
              <Row label="Phone" value={viewData.phone}  />
              <Row label="Joined" value={viewData.join_date} />
              <Row label="Active Borrows" badge={`${viewData.borrowed_count || 0} books`} />
            </>
          )}
        </div>
        {!isStaff() && (
            <div className="flex justify-end mt-4">
            <button
            onClick={handleMoreClick}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80"
            >
            More
            </button>
            </div>)}
      </div>
    </div>
  );
}

function Row({ label, value, badge, icon, badgeType }) {
  const icons = {
    user: "lucide-user",
    mail: "lucide-mail",
    phone: "lucide-phone",
    shield: "lucide-shield",
    calendar: "lucide-calendar"
  };
  const isuser=()=>{ if(icon==="user"){return true;}}

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <span className="font-medium w-fit">{label}:</span>
      <span className="col-span-1 flex w-fit">
        {icon && (
  !isuser() ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="lucide lucide-shield mr-2 h-5 w-5 text-red-500">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 
               1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="lucide lucide-user mr-2 h-5 w-5 text-blue-500">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
)}

        {badge ? (
          <div
            className={`text-white bg-black inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              badgeType === "destructive"
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {badge}
          </div>
        ) : (
          value
        )}
      </span>
    </div>
  );
}
