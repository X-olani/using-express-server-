var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false });
var mongoose = require('mongoose');
var fs = require("fs");
var Quote = require('./models/quote');
 var path = require('path');
var edited =require('./models/editingNEW')
//mongodb://<dbuser>:<dbpassword>@ds127065.mlab.com:27065/codespace
var mongoDB ='mongodb://Xolani:yo48chess@ds127065.mlab.com:27065/codespace'
mongoose.connect(mongoDB, {
  useMongoClient: true
});


mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" +"quote_form.html" );
})


//view quotes
app.use(express.static(path.join(__dirname, '/styless')));
app.get('/view_quote.html', function (req, res) {
   res.sendFile( __dirname + "/" +"view_quote.html");
})
app.post('/quote', urlencodedParser, function (req, res) {


  var newQuote = new Quote({
    author:req.body.author,
    quote:req.body.quote,
    rate:req.body.rate,
    _id:req.body.id

  });
  console.log(newQuote);
  res.end(JSON.stringify(newQuote));

  newQuote.save(function(err) {
    if (err) throw err;

  console.log('Quote saved successfully!');

});

  // Prepare output in JSON format
     // response = {
     //    author:req.body.author,
     //    quote:req.body.quote
     // };
     // console.log(response);
     // res.end(JSON.stringify(response));
})
//res.redirect('/view_quote.html')
app.get('/all_quote', function(req,res){
 Quote.find({}, function(err, quotes){
   if (err) throw  err;
   res.end(JSON.stringify(quotes))
});

})

app.get('/edit', function (req, res) {
   res.sendFile( __dirname + "/" +"edit.html");
});
app.post('/edited', urlencodedParser, function (req, res) {
  var editedQuote ={};

  id=req.body.id;
quote=req.body.quote;
editedQuote=quote;
   console.log(id)
   Quote.findByIdAndUpdate(id, { quote: editedQuote }, function(err, user) {
     if (err) throw err;
     console.log(user)
   });
   res.redirect('view_quote.html')
});






//update
app.post('/edi', urlencodedParser, function (req, res) {
  var items={
   editedQuotes :req.query.quote
 };
  var ids=req.body.id
});
  Quote.findByIdAndUpdate(ids, { quote: editedQuotes }, function(err, user) {
    if (err) throw err;
    console.log(user)
  });
  res.redirect('view_quote.html')

// delete a quote
app.get('/delete_quote', function (req, res) {
       let id = req.query.id;
       console.log( 'HERE WE ARE DELETING' );
       console.log( id );
      //delete quote by id
      Quote.findById(id, function(err, quote) {
          if (err) throw err;
              quote.remove(function(err) {
                  if (err) throw err;
                  console.log('Quote successfully deleted!');
              });
      });
      res.redirect('view_quote.html')
});

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port
 console.log("Example app listening at http://%s:%s", host,port)
})
