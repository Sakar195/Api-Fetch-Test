import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetch Request Failed");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error in fetching Data");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <p className="text-center text-blue-500 text-xl font-bold">
        Data is Loading, please wait...
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 text-xl font-bold">{error}</p>
    );
  }
  return (
    <ul className="list-disc pl-5">
      {users.map((user) => (
        <li key={user.id} className="text-lg text-gray-600">
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
