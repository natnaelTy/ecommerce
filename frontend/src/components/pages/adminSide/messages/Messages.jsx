import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, markMessageAsRead } from '../../../../store/adminside/adminSlice';
import { useEffect } from 'react';
import { FaEnvelopeOpen, FaEnvelope, FaUser } from "react-icons/fa";

export default function Messages() {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
<div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaEnvelope className="text-amber-500" /> Customer Messages
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : messages && messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((note) => (
              <li
                key={note.id}
                className={`p-4 rounded-lg border transition-all ${
                  note.isRead
                    ? "bg-gray-100 border-gray-200"
                    : "bg-white border-2 border-amber-400 shadow"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {note.isRead ? (
                    <FaEnvelopeOpen className="text-gray-400" />
                  ) : (
                    <FaEnvelope className="text-amber-500" />
                  )}
                  <span className="font-semibold text-lg">Message</span>
                </div>
                <div className="flex items-center gap-2 mb-1 text-gray-700">
                  <FaUser className="text-gray-400" />
                  <span className="font-medium">{note.fullName}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-blue-600 underline">{note.email}</span>
                </div>
                <div className="mb-2 text-gray-600">{note.message}</div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
                {!note.isRead && (
                  <button
                    className="text-blue-600 text-xs font-medium hover:underline"
                    onClick={() => dispatch(markMessageAsRead(note.id))}
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-10">No messages found.</div>
        )}
      </div>
    </div>
  );
}