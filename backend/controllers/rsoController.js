require('dotenv').config();
const mysql = require('mysql2');
const asyncHandler = require('express-async-handler');
const { rso } = require('./eventController');

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// @router POST to /rso/join
// @desc   Join an RSO
// @access Public
const join = asyncHandler(async (req, res) => {
    const {rsoID, userID} = req.body;
    const values = [userID, rsoID];

    db.query(`INSERT INTO User_RSOID (UserID, RSOID) VALUES (?, ?)`, values, (err) => {
        if (err)
        {
          res.status(500).json({message: "Server error"})
        }
        res.status(200).json({message: "Sucessfully joined the RSO"})
    })
})

// @router POST to /rso/leave
// @desc   Leave an RSO
// @access Public
const leave = asyncHandler(async (req, res) => {
  const { rsoID, userID } = req.body;
  const values = [userID, rsoID]

  db.query(
    `DELETE FROM User_RSOID WHERE UserID = ? AND RSOID = ?`, values,
    (err) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      }
      res.status(200).json({ message: "Successfully left the RSO" });
    }
  );
});

// @router POST to /rso/create
// @desc   Create a RSO; Number of members required; Admin or SuperAdmin
// @access Private
const create = asyncHandler(async (req, res) => {
    const {name, universityID} = req.body;
    const rsoQuery = 'INSERT INTO RSO (Name, UniversityID) VALUES (?, ?)';

    db.query(rsoQuery, [name, universityID], function (error) {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
      res.status(200).json({message: "Created RSO"})
    });
})

// @router POST to /rso/approved (will need university id)
// @desc   Get approved RSOs
// @access Public
const approved = asyncHandler(async(req, res) => {
    const universityID = req.body.universityID;

    const sql = 'SELECT * FROM RSO WHERE UniversityID = ? AND IsApprove = ?';
    const values = [universityID, true];

    db.query(sql, values, (error, results) => {
        if (error)
        {
          res.status(500).json({message: "Server error"})
        }

        res.json(results);
    });
})

// @router POST to /rso/unapproved (will need university id)
// @desc   Get unapproved RSOs
// @access Private
const unapproved = asyncHandler(async(req, res) => {
    const universityID = req.body.universityID;

    const sql = 'SELECT * FROM RSO WHERE UniversityID = ? AND IsApprove = ?';
    const values = [universityID, false];
  
    db.query(sql, values, (error, results) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
  
      res.json(results);
    });
})

// @router POST to /rso/getRSO
// @desc   Get all RSOs associated with a person
// @access Private
const getRSO = asyncHandler(async(req, res) => {
    const userID = req.body.userID;

    // Define the SQL query to select RSOs associated with the given userID
    const sql = 'SELECT r.* FROM RSO r JOIN User_RSOID ur ON r.ID = ur.RSOID WHERE ur.UserID = ?';
  
    // Execute the query with the given userID parameter
    db.query(sql, [userID], (error, results) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }else {
        // Return the retrieved RSOs as a JSON response
        res.json(results);
      }
    });
})

// @router POST to /rso/edit
// @desc   Edit an RSO if it is an admin to the RSO or SuperAdmin
// @access Private
const edit = asyncHandler(async (req, res) => {
    const rsoID = req.body.rsoID;
    const updatedName = req.body.name;
    const updatedUniversityID = req.body.universityID;
    const updatedIsApprove = req.body.isApprove;
  
    const sql = 'UPDATE RSO SET Name = ?, UniversityID = ?, IsApprove = ? WHERE ID = ?';
    const values = [updatedName, updatedUniversityID, updatedIsApprove, rsoID];
  
    db.query(sql, values, (error) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
  
      res.json({ message: 'RSO updated successfully!' });
    });
})

// @router POST to /rso/remove
// @desc   Remove an RSO if it is an admin to the RSO or SuperAdmin
// @access Private
const remove = asyncHandler(async (req, res) => {
    const rsoID = req.body.rsoID;

    const sql = 'DELETE FROM RSO WHERE ID = ?';
    const values = [rsoID];
  
    db.query(sql, values, (error) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
  
      res.json({ message: 'RSO removed successfully!' });
    });
})

// @router POST to /rso/student
// @desc   Returns list of students associated with the RSO
// @access Private
const student = asyncHandler(async (req, res) => {
    const rsoID = req.body.rsoID;

    const sql = 'SELECT User.* FROM User INNER JOIN User_RSOID ON User.ID = User_RSOID.UserID WHERE User_RSOID.RSOID = ?';
    const values = [rsoID];
  
    db.query(sql, values, (error, results) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
  
      res.json(results);
    });
})

module.exports = {
    approved,
    unapproved,
    getRSO,
    create,
    join,
    leave,
    edit,
    remove,
    student
}