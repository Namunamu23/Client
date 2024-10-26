import React, { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>User Information</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
