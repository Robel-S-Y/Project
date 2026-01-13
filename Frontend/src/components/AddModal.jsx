import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import { useGenreStore } from "../store/genreStore";

export default function AddModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const location = useLocation();
  const locationname = location.pathname.replace("/", "");
  const [error, setError] = useState("");
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

  const isStaff = () => location.pathname === "/staff";
  const isGenres = () => location.pathname === "/genres";
  const isBooks = () => location.pathname === "/books";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]" role="dialog" aria-modal="true">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold capitalize">Add New {isStaff() ? "Staff Member" : locationname}</h2>
          <p className="text-sm text-muted-foreground">Enter the {isGenres() ? "genre name" : locationname + " information"} below.</p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >

          {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}
          {isGenres() && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">Genre Name</label>
                <input
                  id="name"
                  required
                  placeholder="Enter genre name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>
            </div>
          )}

          {isBooks() && (
            <div className="grid gap-4 py-4">
              {/* Title */}
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium w-fit">Title</label>
                <input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>

              {/* Author */}
              <div className="grid gap-2">
                <label htmlFor="author" className="text-sm font-medium w-fit">Author</label>
                <input
                  id="author"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>

              {/* Published Year */}
              <div className="grid gap-2">
                <label htmlFor="published_year" className="text-sm font-medium w-fit">Published Year</label>
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

              {/* Available Copies */}
              <div className="grid gap-2">
                <label htmlFor="available_copies" className="text-sm font-medium w-fit">Available Copies</label>
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

              {/* Genre */}
              <div className="grid gap-2">
                <label htmlFor="genre_id" className="text-sm font-medium w-fit">Genre</label>
                <select
                  id="genre_id"
                  required
                  value={formData.genre_id}
                  onChange={(e) => setFormData({ ...formData, genre_id: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                >
                  <option value="">Select Genre</option>
                  {genreStore.genres?.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>))}
                </select>
              </div>
            </div>
          )}

          {!isGenres() && !isBooks() && (
            <div className="grid gap-4 py-4">
              
              {/* Full Name */}
              {!isStaff() && (
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium w-fit">Full Name</label>
                <input
                  id="name"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>)}

              
              {/* Username */}
              {isStaff() && (
              <div className="grid gap-2">
                <label htmlFor="username" className="text-sm font-medium w-fit">username</label>
                <input
                  id="username"
                  required
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>)}

              {/* Email */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium w-fit">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                />
              </div>

              {/* Phone */}
              {!isStaff() && (
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
              {/* Role - Only for Staff */}
              {isStaff() && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium w-fit">Role</label>
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
                    <label htmlFor="password" className="text-sm font-medium w-fit">Password</label>
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium w-fit">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="mt-2 sm:mt-0 rounded-md border px-4 py-2 text-sm border-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80"
            >
              Create {isStaff() ? "Staff" : locationname.slice(0, -1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
