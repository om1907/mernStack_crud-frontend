import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';

const UpdateUser = () => {

    const [inputUser,setInputUser]=useState({
        name:"",
        email:"",
        password:""
    });

    const { id } = useParams();
    
    
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:3300/api/getuserdata/${id}`);
        console.log(res);
        setInputUser({
            name:res.data.name,
            email:res.data.email,
            password:res.data.password
        })
    
    };
    useEffect(() => {
      fetchSingleUser();
    },[]);

    const handleChange=(event)=>{
        setInputUser({
            ...inputUser,
            [event.target.name]:event.target.value
        })
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        console.log(inputUser);
        try {
            const res = await axios.put(`http://localhost:3300/api/updateuser/${id}`, inputUser);
            if (res.status === 200) {
              window.location = '/';
            }
          } catch (error) {
            console.error(error);
          }
    }

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Update User
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser
