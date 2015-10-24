var express = require('express');
var app = express();
var https = require('https');
var path = require('path');
var hbs = require('hbs')


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');

app.engine('html',hbs.__express);

app.use(express.static('public'));

app.get('/search', function(req, res,next) {
  //res.render('index.html')
var endPointSpotify = "https://api.spotify.com/v1/search"+"?q="+req.query.q+"&type=track&limit=10";
var buffer = "";
	https.get(endPointSpotify,function (response) {//calback con los datos del la peticion get

		response.on("data",function (d) {
		buffer += d;
		//console.log('datos',JSON.parse(buffer))
		});
		response.on("end", function (err) {
			if (req.query.q) {
      			res.render('index', {items: JSON.parse(buffer).tracks.items});
      		}
      		else{
      			res.render('index')
      		}
    	});

	})
});
app.get('/', function(req, res, next) {
  res.render('index.html')
});

app.listen(3000, function() {
  console.log('Node Server Running');
});