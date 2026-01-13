import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGenreStore } from "../store/genreStore";

export default function EditModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const location = useLocation();
  const locationname = location.pathname.replace('/', '');
  const genreStore = useGenreStore((state) => state);

    useEffect(()=>{
    genreStore.getGenres();
    },[]);

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

  const isStaff = () => location.pathname === '/staff'||location.pathname ===`/staff/${formData.id}`;
  const isGenres = () => location.pathname === '/genres'||location.pathname ===`/genres/${formData.id}`;
  const isBooks = () => location.pathname === '/books'||location.pathname ===`/books/${formData.id}`;
  const isSingleBook = () => location.pathname ===`/books/${formData.id}`;

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight capitalize">
              Edit {isStaff() ? 'Staff Member' :isSingleBook() ? `"${formData.title}"`: locationname}
          </h2>
          <p className="text-sm text-gray-500">
            Update the {isGenres() ? 'genre name below' :isSingleBook() ? `"${formData.title}"`: `${locationname} information below`}.
          </p>
        </div>

        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}>
          {isGenres() && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">
                  Genre Name
                </label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
            </div>
          )}

          {isBooks() && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium w-fit">
                  Title
                </label>
                <input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="author" className="text-sm font-medium w-fit">
                  Author
                </label>
                <input
                  id="author"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="published_year" className="text-sm font-medium w-fit">
                  Published Year
                </label>
                <input
                  id="published_year"
                  type="number"
                  min="1800"
                  max="2025"
                  required
                  value={formData.published_year}
                  onChange={(e) => setFormData({ ...formData, published_year: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="available_copies" className="text-sm font-medium w-fit">
                  Available Copies
                </label>
                <input
                  id="available_copies"
                  type="number"
                  min="0"
                  required
                  value={formData.available_copies}
                  onChange={(e) => setFormData({ ...formData, available_copies: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="genre" className="text-sm font-medium w-fit">
                  Genre
                </label>
                <select
                  id="genre"
                  required
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                >
                  {genreStore.genres?.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>))}
                </select>
              </div>
            </div>
          )}

          {!isGenres() && !isBooks() && (
            <div className="grid gap-4 py-4">
              {isStaff() ? (
              <div className="grid gap-2">
                <label htmlFor="username" className="text-sm font-medium w-fit">
                  Username
                </label>
                <input
                  id="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>):
              (
                <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">
                  Full Name
                </label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              )
              }
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium w-fit">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
             {!isStaff() &&( 
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium w-fit">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
              )}
              {isStaff() && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium w-fit">
                      Role
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    >
                      <option value="librarian">Librarian</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium w-fit">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="mt-2 sm:mt-0 rounded-md border px-4 py-2 text-sm border-gray-200 cursor-pointer hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black cursor-pointer px-4 py-2 text-sm text-white hover:opacity-80"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
