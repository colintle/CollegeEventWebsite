require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 9000;

app.use('/user', require('./routes/userRoutes'));

app.use('/uni', require('./routes/uniRoutes'));

app.use('/event', require('./routes/eventRoutes.js'));

app.use('/rso', require('./routes/rsoRoutes.js'));

app.use('/ratings', require('./routes/ratingRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));