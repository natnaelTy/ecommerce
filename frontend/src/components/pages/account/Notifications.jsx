import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications, markNotificationAsRead } from "../../../store/user/userSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const { user, loading, error, notifications } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotifications(user.id));
    }
  }, [user, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {notifications && notifications.length > 0 ? (
        <ul>
          {notifications.map((note) => (
            <li key={note.id} className={`mb-4 p-3 border rounded ${note.read ? "bg-gray-100" : "bg-white"}`}>
              <div className="font-semibold">{note.title}</div>
              <div>{note.message}</div>
              <div className="text-xs text-gray-400">{new Date(note.date).toLocaleString()}</div>
              {!note.read && (
                <button
                  className="text-blue-500 text-xs mt-1"
                  onClick={() => dispatch(markNotificationAsRead(note.id))}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no new notifications.</p>
      )}
    </div>
  );
}