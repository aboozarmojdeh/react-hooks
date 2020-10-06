import React, { Fragment, useState, useEffect } from 'react';
import EditUser from '../EditUser/EditUser';
const MainPage = () => {

    const [users, setUsers] = useState([]);
    const [userEffect,setUserEffect]=useState(0)
    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [todo_date, setTodoDate] = useState("");
    const [todo_check, setTodoCheck] = useState(false);

    const onChangeInputName = (event) => {
        // console.log(event.target.value)
        setName(event.target.value)
    }

    const onChangeInputEmail = (event) => {
        // console.log(event.target.value)
        setEmail(event.target.value)
    }

    const onChangeInputTodoDate = (event) => {
        // console.log(event.target.value)
        setTodoDate(event.target.value)
    }

    const onChangeInputTodoCheck = (event) => {
        // console.log(event.target.value)
        setTodoCheck(event.target.value)
    }

const deleteUserButton=(id)=>{

try {
    const response=fetch(`http://localhost:5000/users/${id}`,{
        method:"DELETE"
    });
   
    setUsers(users.filter(user=>user.id!==id))
} catch (err) {
    console.error(err.message)
}
}
   

    const renderedUsers = users.map((user) => {
        return (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.todo_date.slice(0,10)}</td>
                <td>{String(user.todo_check)}</td>
                <td><EditUser user={user} userEffect={userEffect}/></td>
                <td><button className="btn btn-danger" onClick={()=>deleteUserButton(user.id)}>Delete</button></td>
            </tr>
        )
    });

    const onSubmitUser = async (e) => {
        e.preventDefault();

        try {
            const body = { name, email, todo_date, todo_check }
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // console.log(response);
            setUserEffect(userEffect+1)
            document.getElementById("todoName").value=""
            document.getElementById("todoEmail").value=""
            document.getElementById("TodoDate").value=""
            document.getElementById("TodoChecked").value=""

        } catch (err) {
            console.error(err.message)
        }
    };
    useEffect(() => {
        // console.log("length",users.length)
        const getUserData = async () => {
            const response = await fetch('http://localhost:5000/users');
            const allUsers = await response.json();
            setUsers(allUsers);
            // console.log("length",users.length)
            // console.log("users", users)
        };
        getUserData();

    },[userEffect]);


    return (
        <Fragment>
            <h1>User Todo</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitUser}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter name"
                    id="todoName"
                    onChange={onChangeInputName}
                    required
                />
                <input
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    id="todoEmail"
                    onChange={onChangeInputEmail}
                    required
                />
                <input
                    className="form-control"
                    type="date"
                    id="TodoDate"
                    onChange={onChangeInputTodoDate}
                    required
                />

                <input
                    className="form-control"
                    type="text"
                    id="TodoChecked"
                    placeholder="False or True"
                    onChange={onChangeInputTodoCheck}
                    required
                />

                <button className="btn btn-success">Add</button>
                <input className="btn btn-grey" type="reset" />
            </form>

            <br />

            <table className="table">
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Todo Date</th>
                        <th>Todo Checked</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedUsers}
                </tbody>
            </table>

        </Fragment>

    )
};

export default MainPage;