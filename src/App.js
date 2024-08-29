import UserList from "./components/UserList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          User List from API
        </h1>
        <UserList />
      </div>

      {/* Any components added in the futute will go here */}
    </div>
  );
}

export default App;
