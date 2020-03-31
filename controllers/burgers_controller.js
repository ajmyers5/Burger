var burgers = require("../models/burger.js");
var express = require('express');
var router = express.Router();

//burger router.post ->


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) { //what does this cat. refer to?  the cat variable? should this be burgerz

  burgers.all(function(data) {
    var hbsObject = {
      allBurgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
    // res.send("../views/index.html")
  });
});

// router.get("/", function(req, res) {
//   res.redirect("/burgers");
// });
// router.get("/burgers", function(req, res) {
//   burgers.all(function(burgerData) {
//     res.render("index", { burger_data: burgerData });
//   });
// });

router.post("/api/burgers", function(req, res) {
  burgers.create([
    "burger_name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burgers.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
