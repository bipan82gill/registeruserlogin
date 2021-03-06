const express = require('express');
const session = require('express-session');        

const path = require('path');
const pageRouter= require('./routes/pages');

const app = express();
// serve static pages
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
//template engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// session
app.use(session({
    secret:'registeruser_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

//router
app.use('/',pageRouter);
//error
app.use( (req,res,next)=>{
    var err = new Error('Pages not found');
    err.status = 404;
    next(err);
});

//handling errors
app.use((err, req, res, next)=>{
    res.status(err, status||500);
    res.send(err.message);
})
app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3000,()=>{
    console.log("localhost:3000");
});
module.exports= app;