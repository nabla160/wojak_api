const express = require('express');
const cors = require('cors');


const keys = require("./config/keys");

const bdd = require("./module/bdd");

const app = express();

app.listen(8000, () => {
    console.log("Server started !")
})


//Récupérer l'image d'un wojak
app.route('/wojak/:id/img').get((req, res) => {
    bdd.get_wojak(req.params.id)
    .then((data, error) => {

        if (error || data == undefined) {
          res.sendStatus(404);
        } else {
          res.contentType("image/png");
          res.write(data.file, "binary");
          res.end()
        }
      }, () => {
        res.sendStatus(404)
      });
}) 

//Récupérer la miniature d'un wojak
app.get("/wojak/:id/mini", function (req, res, next) {
    var id = req.params.id;
  
    var data = bdd.get_wojak_mini(id);
  
    data.then((data, error) => {
  
      if (error || data == undefined) {
        res.sendStatus(404);
      } else {
        res.contentType("image/webp");
        res.write(data.min_file, "binary");
        res.end();
      }
    }, () => {
      res.sendStatus(404);
    });
  });


//Récupérer les données d'un wojak
app.get("/wojak/:id/data", function(req, res, next) {
    var id = req.params.id;

    var data = bdd.get_metadata(id);

    data
    .then((data, error) => {
        res.send(data);
    })
    .catch( () => {
        res.sendStatus(404);
    })
})

