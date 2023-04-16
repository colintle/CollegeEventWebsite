require('dotenv').config();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
//const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// @router POST to /user/create
// @desc   Creates an account for the website
// @access Public
const create = asyncHandler(async (req, res) => {
  const { username, password, userType, universityID } = req.body;
  //const hashedPassword = await bcrypt.hash(password, 10);

  db.query('SELECT * FROM User WHERE Username = ?', [username], (err, result) => {
    if (result.length > 0) {
      res.status(404).json({ message: 'User found' });
      return;
    }

    db.query(
      'INSERT INTO User (Username, Password, UserType, UniversityID) VALUES (?, ?, ?, ?)',
      [username, password, userType, universityID], (error) => {
        if (error)
        {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: "User created!" });
      }
    );    
  });
})

// @router POST to /user/login
// @desc   Logins to the website
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
    // check if the user exists in the database
  db.query(
    'SELECT * FROM User WHERE Username = ?',
    [username],
    async (err, result) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      if (result?.length === 1) {
        const user = result[0];
        //const passwordMatch = await bcrypt.compare(password, user.Password);
        if (password == user.Password)
        {
          const token = jwt.sign(
            { userID: user.ID, username, userType: user.UserType, universityID: user.UniversityID}, 
            'secret', 
            {expiresIn: "1h"}
          );

          res.status(200).json({token});
        }
        else
        {
          res.status(401).json({message: "Invalid username or password"});
        }
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  );

})

// @router POST to /user/edit
// @desc   Edit information of user
// @access Public
const edit = asyncHandler(async (req, res) => {
  const { username, password, universityID } = req.body;
  const userID = req.userID

  //const hashedPassword = await bcrypt.hash(password, 10);
  
    // check if the user exists in the database
  db.query('SELECT * FROM User WHERE ID = ?', [userID], (err, result) => {
    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    db.query(
      'UPDATE User SET Username = ?, Password = ?, UniversityID = ? WHERE ID = ?',
      [username, password, universityID, userID],
      (err, result) => {
        if (err)
        {
          res.status(500).json({message: err})
        }
        res.status(200).json({ message: 'User updated successfully' });
      }
    );
  });
})

// @router POST to /user/remove
// @desc   Remove the user
// @access Public
const remove = asyncHandler(async (req, res) => {
  const userID = req.userID;

  db.query('SELECT * FROM User WHERE ID = ?', [userID], (err, result) => {
    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    db.query('DELETE FROM User WHERE ID = ?', [userID], (err, result) => {
      if (err){
        res.status(500).json({message: "Error deleting user"})
      }
      res.status(200).json({ message: 'User deleted successfully!' });
    });
  });
})

module.exports = {
    create,
    login,
    edit,
    remove
}
