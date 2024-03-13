const app = require("./app");
const PORT = 8000;

const userController = require('./controller/user');

app.get('/hi', userController.hiApi);
app.get('/login', userController.loginApi);
app.get('/signup', userController.signupApi);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});

