import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoTrash  } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const result = await axios.get('http://localhost:5000/users');
    setUsers(result.data)
  }

  const deleteUsers = async(userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  }
  
  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>

      <Link to={"/users/add"} className='button is-primary mb-2'><IoIosAddCircle/></Link>
      <table className='table is-stripe is-fullwidth'>
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/edit/${user.uuid}`} className='button is-small is-info'><FaPen/></Link>
                  <button onClick={() => deleteUsers(user.uuid)} className='button is-small is-danger'><IoTrash/></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
