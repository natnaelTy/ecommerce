import { useSelector } from "react-redux";
import Loading from "../../../../utils/loading/Loading";

export default function Users() {
  const { users, loading } = useSelector((state) => state.admin);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1250px] px-4 w-full ml-auto bg-gray-50 min-h-screen py-2">
      <div className="overflow-x-auto border-gray-100 border-1 shadow-xs rounded-sm bg-white">
        <table className="w-full">
          <thead className="h-10 px-4">
            <tr className="text-left">
              <th className="px-4 py-2">Profile Picture</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-left capitalize font-medium">
                  <td className="px-4 py-2">
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="w-8 h-8 object-cover rounded-sm"
                    />
                  </td>
                  <td className="px-4 py-2">#{user.id}</td>
                  <td className="px-4 py-2">{user.fullName}</td>
               
                  <td className="px-4 py-2"> {user.email} </td>

                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
