var friends = require("..app/data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        //this var is the user filling out the survery
        var userAsFriend = req.body;

        var highestMatch = {};

        for (var i = 0; i < userAsFriend.scores.length; i++) {
            if (userAsFriend.scores[i] == "1 (Strongly Disagree)") {
                userAsFriend.scores[i] = 1;
            } else if (userAsFriend.scores[i] == "5 (Strongly Agree)") {
                userAsFriend.scores[i] = 5;
            } else {
                userAsFriend.scores[i] = parseInt(userAsFriend.scores[i]);
            }
        }
        var userMatchIndex = 0;
        var userMatchDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var differencePointsTotal = 0;

            for (var index = 0; index < friends[i].scores.length; index++) {
                var differenceOnePoint = Math.abs(friends[i].scores[index] - userAsFriend.scores[index]);
                differencePointsTotal += differenceOnePoint;
            }

            if (differencePointsTotal < userMatchDifference) {
                userMatchIndex = i;
                userMatchDifference = differencePointsTotal;
            }
        }

        highestMatch = friends[userMatchIndex];

        friends.push(userAsFriend);

        res.json(highestMatch);

    });
};