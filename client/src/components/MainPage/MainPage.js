import React, { Fragment, useState, useEffect } from 'react';

const MainPage = () => {

    const [users, setUsers] = useState([]);
    const [userEffect,setUserEffect]=useState(0)
    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [todo_date, setTodoDate] = useState("");
    const [todo_check, setTodoCheck] = useState(false);

    const onChangeInputName = (event) => {
        console.log(event.target.value)
        setName(event.target.value)
    }

    const onChangeInputEmail = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value)
    }

    const onChangeInputTodoDate = (event) => {
        console.log(event.target.value)
        setTodoDate(event.target.value)
    }

    const onChangeInputTodoCheck = (event) => {
        console.log(event.target.value)
        setTodoCheck(event.target.value)
    }


   

    const renderedUsers = users.map((user) => {
        return (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.todo_date}</td>
                <td>{String(user.todo_check)}</td>
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
            console.log(response);
            setUserEffect(userEffect+1)

        } catch (err) {
            console.error(err.message)
        }
    };
    useEffect(() => {
        console.log("length",users.length)
        const getUserData = async () => {
            const response = await fetch('http://localhost:5000/users');
            const allUsers = await response.json();
            setUsers(allUsers);
            console.log("length",users.length)
            console.log("users", users)
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
                />
                <input
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    id="todoEmail"
                    onChange={onChangeInputEmail}
                />
                <input
                    className="form-control"
                    type="date"
                    id="TodoDate"
                    onChange={onChangeInputTodoDate}
                />

                <input
                    className="form-control"
                    type="text"
                    id="TodoChecked"
                    placeholder="False or True"
                    onChange={onChangeInputTodoCheck}
                />

                <button className="btn btn-success">Add</button>
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