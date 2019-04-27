
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



// in order to use PARTIALS we have to REGISTER them
hbs.registerPartials(__dirname + "/views/partials");



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => { 
// .getBeers => method we get from punkAPI
  punkAPI.getBeers()
  // responseFromDB is just placeholder, can be any word
  .then(responseFromDB => { // =================================> ".this()" holds success callback 
    console.log("Response is:", responseFromDB );

                        // we are renaming responseFromDB to allBeers variable 
                        // which we'll use in the views
    res.render('beers-info', { allBeers:responseFromDB })
  })
  .catch(error => { // ============================================> ".catch()" is failure callback
    console.log(error)
  })
})




app.get('/random-beer', (req, res, next) => { 
  // .getRandom()  is method given by punkAPI
  punkAPI.getRandom()
  .then(someResponse => {
    console.log(" = == = == = == == > ", someResponse[0]);
    res.render('random-beer-info', { randomBeer:someResponse[0] })
  })
  .catch(error => {
    console.log(error)
  })
})

app.listen(3000, () => console.log("Running on 3000 ❤️"));