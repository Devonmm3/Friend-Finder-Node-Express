var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var friends = require("./app/data/friends.js");
var app = express();
var PORT = process.env.PORT || 3000;

// app.use(express.static("app/public"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(express.text());
// app.use(express.json({
//     type: "application/vnd.api+json"
// }));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(process.env.PORT || 3000);