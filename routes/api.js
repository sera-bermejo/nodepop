var express = require('express');
const Anuncio = require('../models/Anuncio');
var router = express.Router();


router.post("/create_anuncio", (req, res, next) => {
    const nombre = req.body["nombre"];
    let venta;
    if (req.body["venta"].toLowerCase() === "true") {
      venta = true;
    }  else {
      venta = false;
    }
    const precio = parseFloat(req.body["precio"])
    const foto = req.body["foto"]
    const tags = req.body["tags"].split(",")
  
    const anuncio = new Anuncio({
      nombre: nombre,
      venta: venta,
      precio: precio,
      foto: foto,
      tags: tags
    });
  
     
     const anuncioGuardado = anuncio.save();
     res.json({result: anuncioGuardado});
  
  });
  

router.get("/get_anuncios", async (req, res, next) => {
 
  try {
      const skip = req.query.skip;
      const limit = req.query.limit;
      const fields = req.query.fields; 
      const sort = req.query.sort; 
      const filtro = {};

      if (req.query.nombre) { 
        filtro.nombre = new RegExp("^" + req.query.nombre, "i");
      }
      if (req.query.venta) {
        if (req.query.venta.toLowerCase() === "true") { filtro.venta = true;};
        if (req.query.venta.toLowerCase() === "false") { filtro.venta = false;};
      }

      if (req.query.precio) { 
        let precios = req.query.precio.split('-'); 
        // let precios = ['50.1']
        if (precios.length === 1 ) {
          filtro.precio = parseFloat(precios[0])
        } else {filtro.precio = {'$gte': parseFloat(precios[0]), '$lte': parseFloat(precios[1])};
      } 
    }
      

      if (req.query.tags) { 
        filtro.tags = { "$in" :req.query.tags.split(",")};
      }

      const results = await Anuncio.find(filtro, skip, limit, fields, sort); 
      res.json({results: results});

  } catch(err) {
      // si diera error, llamamos a next para que pase al siguiente middleware. 
      next(err);
  }  
});

router.get("/get_tags", (req, res, next) => {
  Anuncio.find({}, function(err, anuncio){
    let tagsList = [];
    for(let i = 0; i < anuncio.length; i++) {
      for(let j = 0; j < anuncio[i].tags.length; j++) {
        if (!tagsList.includes(anuncio[i].tags[j])) {
          tagsList.push(anuncio[i].tags[j])
        }
      }
   }
    res.json({results: tagsList})
  });
});


module.exports = router;

