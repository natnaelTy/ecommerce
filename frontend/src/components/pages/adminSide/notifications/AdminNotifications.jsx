import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications, markNotificationAsRead } from "../../../../store/user/userSlice";
import Loading from "../../../../utils/loading/Loading";



export default function AdminNotifications() {
  const dispatch = useDispatch();
  const { loading, error, notifications } = useSelector((state) => state.user);

  useEffect(() => {
      dispatch(fetchNotifications());
  }, [dispatch]);

  if(loading)
    return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {error && <p className="text-red-500">{error}</p>}
      {notifications && notifications.length > 0 ? (
        <ul>
          {notifications.map((note) => (
            <li key={note.id} className={`mb-4 p-3 border border-gray-300 rounded-md ${note.isRead ? "bg-gray-100" : "bg-white border-1 border-pink-500"}`}>
              <div className="font-semibold">{note.title}</div>
              <div>{note.message}</div>
              <div className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleString("en-US",
                { dateStyle: "medium", timeStyle: "short" }
              )}</div>
              {!note.isRead && (
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