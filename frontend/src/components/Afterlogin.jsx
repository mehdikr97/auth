
export default function Dashboard() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome!
      </h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
