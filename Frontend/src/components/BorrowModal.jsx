import { useEffect,useState } from "react";
import { X, Calendar } from "lucide-react";
import { useMemberStore } from "../store/memberStore";
import { useBookStore } from "../store/bookStore";

function BorrowModal({ isOpen, onClose, onSubmit }) {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const bookStore = useBookStore((state) => state);
  const memberStore = useMemberStore((state) => state);

  const books=bookStore.books
  const members=memberStore.members

    useEffect(()=>{
        bookStore.getBooks();
      },[]);

      useEffect(()=>{
        memberStore.getMembers();
      },[]);
 
 

  // Generate current date
  const today = new Date();
  const borrowDate = today.toISOString().split("T")[0]; // e.g., "2025-07-10"

  // Set default due date to 14 days from today
  const defaultDue = new Date(today);
  defaultDue.setDate(today.getDate() + 14);
  const dueDate = defaultDue.toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[500px]"
      >
        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold tracking-tight">Borrow Book</h2>
          <p className="text-sm text-gray-500">Select a book and member to create a new borrow record.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              book_id: Number(selectedBook),
              member_id: Number(selectedMember),
              due_date: dueDate
            });
          }}
        >
          <div className="grid gap-4 py-4">
            {/* Book Selection */}
            <div className="grid gap-2">
              <label htmlFor="book" className="text-sm font-medium w-fit">
                Select Book
              </label>
              <select
                id="book"
                required
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
              >
                <option value="">Choose a book to borrow</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} • {book.available_copies} available
                  </option>
                ))}
              </select>
            </div>

            {/* Member Selection */}
            <div className="grid gap-2">
              <label htmlFor="member" className="text-sm font-medium w-fit">
                Select Member
              </label>
              <select
                id="member"
                required
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm border-gray-200"
              >
                <option value="">Choose a member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Borrow and Due Dates */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="grid grid-rows-2">
                <label className="text-sm font-medium text-gray-600 justify-self-start">Borrow Date</label>
                <div className="flex items-center mt-1 text-sm">
                  <Calendar className="mr-2 h-4 w-4" /> {borrowDate}
                </div>
              </div>
              <div className="grid grid-rows-2">
                <label className="text-sm font-medium text-gray-600 justify-self-start">Due Date</label>
                <div className="flex items-center mt-1 text-sm">
                  <Calendar className="mr-2 h-4 w-4" /> {dueDate}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 border-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80 cursor-pointer"
            >
              Borrow Book
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

export default BorrowModal;
