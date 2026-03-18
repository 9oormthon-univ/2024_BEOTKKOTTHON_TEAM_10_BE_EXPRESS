require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { sendPushNotification } = require('./services/notification');
const userRoutes = require('./routes/user');
const scholarshipRoutes = require('./routes/scholarship');
const calendarRoutes = require('./routes/calendar');
const countRoutes = require('./routes/count');
const proxyRoutes = require('./routes/proxy');

const app = express();
const PORT = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/user', userRoutes);
app.use('/scholarship', scholarshipRoutes);
app.use('/calendar', calendarRoutes);
app.use('/count', countRoutes);
app.use(proxyRoutes);

setInterval(sendPushNotification, 10 * 1000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
