require('dotenv').config();
const mysql = require('mysql2');
const asyncHandler = require('express-async-handler');

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// @router POST to /event/create
// @desc   Create an event
// @access Private
const create = asyncHandler(async (req, res) => {
    const event = req.body;

    const query1 = `SELECT IsApprove FROM RSO WHERE ID = ${event.rsoID}`;
    const query2 = `INSERT INTO Event (Name, Category, Description, Time, Date, LocationName, Latitude, Longitude, ContactPhone, ContactEmail, IsPublic, UniversityID, RSOID) VALUES ('${event.Name}', '${event.category}', '${event.description}', '${event.time}', '${event.date}', '${event.locationName}', ${event.latitude}, ${event.longitude}, '${event.contactPhone}', '${event.contactEmail}', ${event.isPublic ? 1 : 0}, ${event.universityID}, ${event.rsoID})`;

    db.query(query1, (err, result) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      if (result[0].IsApprove)
      {
        db.query(query2, (err) => {
          if (err)
          {
            res.status(500).json({message: "Server error"})
          }
          res.status(200).json({message: "Event created successfully."})
        })
      }
      else
      {
        res.status(403).json({message: "Event is not approved."})
      }
    });
  
})

// @router POST to /event/public (will need university ID)
// @desc   Get public events
// @access Public
const public = asyncHandler(async (req, res) => {
  const universityID = req.body.universityID;
   const query = `SELECT * FROM Event WHERE IsPublic = 1 AND UniversityID = ?`;
    db.query(query, [universityID],(err, results) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      res.json(results);
    });
})

// @router POST to /event/private (will need university ID)
// @desc   Get private events
// @access Private
const private = asyncHandler(async (req, res) => {
    const universityID = req.body.universityID;
    const query = `SELECT * FROM Event WHERE (IsPublic = 0) AND UniversityID = ?`;
    db.query(query, [universityID], (err, result) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      res.json(result);
    });
})

// @router POST to /event/rso (will need university ID and RSOID)
// @desc   Get rso-related events
// @access Private
const rso = asyncHandler(async (req, res) => {
    const universityID = req.body.universityID;
    const rsoID = req.body.rsoID;

    const query = `
    SELECT *
    FROM Event
    WHERE UniversityID = ? AND RSOID = ?
    `;

    db.query(query, [universityID, rsoID], function(err, results) {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }

      res.status(200).json(results);
  });
})

// @router POST to /event/approve
// @desc   Allow for superAdmin to approve event
// @access Private
const approve = asyncHandler(async (req, res) => {
    const { eventID } = req.body;
    const query = `UPDATE Event SET isApprove = true WHERE ID = ?`;
    db.query(query, [eventID], (err) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      res.status(200).json({ message: 'Event approved' });
    });
})

// @router POST to /event/deny
// @desc   Allow for superAdmin to deny event
// @access Private
const deny = asyncHandler(async(req, res) => {
    const { eventID } = req.body;
    const query = `UPDATE Event SET isApprove = false WHERE ID = ?`;
    db.query(query, [eventID], (err, result) => {
      if (err)
      {
        res.status(500).json({message: "Server error"})
      }
      res.status(200).json({ message: 'Event denied' });
    });
})

// @router POST to /event/edit
// @desc   Allow for superAdmin to edit an event
// @access Private
const edit = asyncHandler(async(req, res) => {
    const event = req.body;

    db.query(
        `UPDATE Event SET 
          Name = '${event.name}', 
          Category = '${event.category}', 
          Description = '${event.description}', 
          Time = '${event.time}', 
          Date = '${event.date}', 
          LocationName = '${event.locationName}', 
          Latitude = ${event.latitude}, 
          Longitude = ${event.longitude}, 
          ContactPhone = '${event.contactPhone}', 
          ContactEmail = '${event.contactEmail}', 
          IsPublic = ${event.isPublic ? 1 : 0}, 
          UniversityID = ${event.universityID}, 
          RSOID = ${event.rsoID} 
          WHERE ID = ${event.eventID}`,
        (err,) => {
          if (err)
          {
            res.status(500).json({message: "Server error"})
          }
          res.json({ message: 'Event updated successfully!' });
        }
      );
})

// @router POST to /event/remove
// @desc   Allow for superAdmin or Admin of RSO to remove an event
// @access Private
const remove = asyncHandler(async(req, res) => {
    const eventID = req.body.eventID; // Assumes the ID is passed in the URL
    const query = 'DELETE FROM Event WHERE ID = ?';
  
    db.query(query, [eventID], (error, results) => {
      if (error)
      {
        res.status(500).json({message: "Server error"})
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Event not found' });
      } else {
        res.status(200).json({ message: 'Event deleted successfully' });
      }
    });
})

module.exports = {
    create,
    public,
    private,
    rso,
    approve,
    deny,
    edit,
    remove
}