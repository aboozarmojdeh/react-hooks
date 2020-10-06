import React, { Fragment, useState } from 'react';

const EditUser = ({ user, userEffect }) => {

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
const updateUser=async (id)=>{
    try {
        const body={name,email,todo_date,todo_check};
        const response=await fetch(`http://localhost:5000/users/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        // console.log("Updated successfully!")
        const getResponse=await fetch(`http://localhost:5000/users`);
        console.log(getResponse)
        // window.location='/'
        
    } catch (err) {
        console.error(err.message)
    }
}

    return (
        <Fragment>
            {/* <!-- Button to Open the Modal --> */}
            <button 
            onClick={()=>{
                setName(user.name)
                setEmail(user.email)
                setTodoDate(user.todo_date.slice(0, 10))
                setTodoCheck(user.todo_check)
            }}
            type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${user.id}`}>
                Edit
            </button>

            {/* <!-- The Modal --> */}
            <div className="modal fade" id={`id${user.id}`} >
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            {/* Modal body.. */}
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={onChangeInputName}
                            />
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={onChangeInputEmail}
                            />

                            <input
                                className="form-control"
                                type="date"
                                value={todo_date.slice(0, 10)}
                                onChange={onChangeInputTodoDate}
                            />

                            <input
                                className="form-control"
                                type="text"
                                placeholder="False or True"
                                value={todo_check}
                                onChange={onChangeInputTodoCheck}
                            />


                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>updateUser(user.id)}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>

    )
};

export default EditUser;