var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(now)
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err => {
        if(err){
            console.log('unable to append to server.log');
        }
    }));
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => { 
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
return text.toUpperCase();
});


app.get('/', (req, res) => { // '/' for rendering the home page
    res.render('home.hbs',{
         pageTitle:'Home page',
         welcomeMessage:'welcome to the new website built by Deepak'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});


app.listen(3000);
