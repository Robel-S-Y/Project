import React from 'react';

const BorrowHistoryModal = ({ isOpen, onClose, historyData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Borrow History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {historyData.length === 0 ? (
          <p className="text-gray-500">No history available.</p>
        ) : (
          <div className="space-y-4">
            {historyData.map((record) => (
              <div
                key={record.id}
                className="border border-gray-200 rounded p-4 shadow-sm bg-gray-50"
              >
                <p>
                  <strong>Title:</strong> {record.book?.title || 'N/A'}
                </p>
                <p>
                  <strong>Author:</strong> {record.book?.author || 'N/A'}
                </p>
                <p>
                  <strong>Genre:</strong> {record.book?.genre?.name || 'N/A'}
                </p>
                <p>
                  <strong>Borrow Date:</strong> {record.borrow_date}
                </p>
                <p>
                  <strong>Due Date:</strong> {record.due_date}
                </p>
                <p>
                  <strong>Return Date:</strong>{' '}
                  {record.return_date || 'Not Returned'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowHistoryModal;
