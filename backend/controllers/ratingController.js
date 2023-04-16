require('dotenv').config();
const mysql = require('mysql2');
const asyncHandler = require('express-async-handler');

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


// @router POST to /rating/create
// @desc   Create a rating and comment
// @access Public
const create = asyncHandler(async (req, res) => {
    const { eventID, userID, rating, comment } = req.body;

    // Define the SQL query to insert a new rating into the EventRating table
    const sql = 'INSERT INTO EventRating (EventID, UserID, Rating, Comment) VALUES (?, ?, ?, ?)';
  
    // Execute the query with the given parameters
    db.query(sql, [eventID, userID, rating, comment], (error, results) => {
      if (error) {
        // Handle the error and return an error response
        res.status(500).json({ message: 'Error creating event rating' });
      } else {
        // Return the ID of the newly created rating as a JSON response
        res.json({ message: "Sucessfully created comment" });
      }
    });
})

// @router POST to /rating/edit
// @desc   Edit a rating and comment
// @access Public
const edit = asyncHandler(async (req, res) => {
    const { eventID, userID, rating, comment, postID } = req.body;

    // Define the SQL query to insert a new rating into the EventRating table
    const sql = 'UPDATE EventRating SET Rating = ?, Comment = ? WHERE EventID = ? AND UserID = ? AND ID = ?';
  
    // Execute the query with the given parameters
    db.query(sql, [rating, comment, eventID, userID, postID], (error) => {
      if (error) {
        // Handle the error and return an error response
        res.status(500).json({ message: 'Error creating event rating' });
      } else {
        // Return the ID of the newly created rating as a JSON response
        res.json({ message: "Sucessfully edited comment" });
      }
    });
})

// @router POST to /rating/remove
// @desc   Remove a rating and comment
// @access Public
const remove = asyncHandler(async (req, res) => {
    const { postID } = req.body;
  
    const sql = 'DELETE FROM EventRating WHERE ID = ?';
    
    db.query(sql, [postID], (err, result) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      
      const message = result.affectedRows === 0 ? 'No rating found for the given eventID.' : `Successfully removed rating(s) for eventID ${postID}.`;
      res.json({ message });
    });
})

// @router POST to /rating/get
// @desc   get all the comments associated with an event
// @access Public
const get = asyncHandler(async (req, res) => {
    const eventID = req.body.eventID;
    const query = 'SELECT * FROM EventRating WHERE EventID = ?';
    db.query(query, [eventID], (error, results) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      }
      return res.status(200).json(results);
    });
})

module.exports = {
    create,
    edit,
    remove,
    get
}