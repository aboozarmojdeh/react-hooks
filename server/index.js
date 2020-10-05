const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(express.json());
app.use(cors());


//CREATE A USER
app.post('/users', async (req, res) => {
    try {
        const { name, email, todo_date, todo_check } = req.body;
        const addUser = await pool.query("INSERT INTO todo (name, email, todo_date, todo_check) VALUES($1,$2,$3,$4) RETURNING *", [name, email, todo_date, todo_check])
        res.json(addUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

// GET ALL USERS
app.get('/users', async (req, res) => {
    try {

        const getAllUsers = await pool.query("SELECT * FROM todo")
        res.json(getAllUsers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// GET ONE USER
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const getUser = await pool.query(`SELECT * FROM todo WHERE todo.id=${id}`);
        res.json(getUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// UPDATE A USER
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, todo_date, todo_check } = req.body;
    const updatedUser = await pool.query(`UPDATE todo SET (name,email,todo_date,todo_check)=($1,$2,$3,$4) WHERE todo.id=${id}`, [name, email, todo_date, todo_check])
    res.json('updated succesfully')
})

// DELETE A USER 
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query(`DELETE FROM todo WHERE todo.id=${id}`);
        res.json('Deleted successfully!')
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log('server listening to PORT 5000')
});
