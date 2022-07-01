const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dbConfig = require("./app/config/db.config");
const fileupload = require("express-fileupload");
const app = express();
var corsOptions = {
  origin: "https://nodeadminpanel.herokuapp.com"
  // origin: "http://localhost:4200"
};
app.use('/uploads', express.static('uploads'));

app.use(fileupload());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true, parameterLimit:100000000, limit:"50mb"}));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/dynamic-address.routes')(app);
require('./app/routes/status.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/driver.routes')(app);
require('./app/routes/ride.routes')(app);
require('./app/routes/partner.routes')(app);

app.post("/api/login", (req, res) => {
  if(req.body.username == 'gosarthi@admin.com' &&  req.body.password == 'admin@123'){
    res.status(200).send({ data:{username:'gosarthi@admin.com', password: 'admin@123'}, role: "admin", message: "Login Successfull" });
  }else{
    res.status(400).send({ message: "Invalid Login" });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;
db.mongoose
.connect(`mongodb+srv://surabhi:surabhi30@gosarthiadminpanel.pqkck.mongodb.net/admin_panel`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
      new Role({
        name: "driver"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'driver' to roles collection");
      });
      new Role({
        name: "customer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'customer' to roles collection");
      });
    }
  });
}

