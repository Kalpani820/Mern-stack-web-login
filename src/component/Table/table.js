import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import './table.css'

const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.role}</td>
    <td>
      <button className="editeButton"
        onClick={() => {
          props.editeUser(props.user._id);
        }}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      <button className="deleteButton"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}>
        <FontAwesomeIcon icon={faTrash} />
      </button>

    </td>
  </tr>
);

function Table() {

  const [users, setUsers] = useState([]);

  // This method fetches the all users from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch('http://localhost:1337/api/userdetail');

      console.log(response);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      setUsers(users.user);
    }

    getUsers();

    return;
  }, [users.length]);


  // This method will delete a user
  async function deleteUser(id) {
    await fetch(`http://localhost:1337/api/userdetail/${id}`, {
      method: "DELETE"
    });

    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
  }

  // This method will map out the users on the table
  function userList() {
    return users.map((user) => {
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }
//view of Table
  return (
    <div className="main-content">
      <table className="table table-hover" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th scope="row">Name</th>
            <th scope="row">Email</th>
            <th scope="row">role</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>

    </div>
  );
};

export default Table;