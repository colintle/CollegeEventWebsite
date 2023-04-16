require('dotenv').config();
const mysql = require('mysql2');
const asyncHandler = require('express-async-handler');

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// @router GET to /uni/get
// @desc   Get all the Universitys
// @access Public
const get = asyncHandler(async(req, res) => {
    const queryString = 'SELECT * FROM University';

    db.query(queryString, function(error, results) {
        if (error)
        {
          res.status(500).json({message: "Server error"})
        }

        res.json(results);
    });
})

// @router POST to /uni/create
// @desc   Create a university
// @access Public
const create = asyncHandler(async(req, res) => {
    const university = req.body;
    const queryString = 'INSERT INTO University (Name, Location, Description, NumStudents, Pictures) VALUES (?, ?, ?, ?, ?)';
    const values = [university.name, university.location, university.description, university.numStudents, university.pictures];
  
    db.query(queryString, values, function(error) {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
      else
      {
        res.status(201).json({message: "Created university successful"});
      }
    });
})

// @router POST to /uni/edit
// @desc   Edit a university 
// @access Public
const edit = asyncHandler(async (req, res) => {
    const university = req.body;
    const queryString = 'UPDATE University SET Name = ?, Location = ?, Description = ?, NumStudents = ?, Pictures = ? WHERE ID = ?';
    const values = [university.name, university.location, university.description, university.numStudents, university.pictures, university.id];
  
    db.query(queryString, values, function(error) {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
      else
      {
        res.status(204).json({message: "Edited university successful"});
      }
    });
})

// @router DELETE to /uni/remove
// @desc   delete a university 
// @access Public
const remove = asyncHandler(async (req, res) => {
    const universityId = req.body.id;
    const queryString = 'DELETE FROM University WHERE ID = ?';
  
    db.query(queryString, universityId, function(error) {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
      else
      {
        res.status(204).json({message: "Deleted university sucessful"});
      }
    });
})

module.exports = {
    get,
    create,
    edit,
    remove
}