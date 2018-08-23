let express = require('express');

let app = express();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Book = require('./book.model');

//By default we can read the values from req.params but in order to parse json, x url form encoded params etc,
//we need to explicitly write the content type by using app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/issues',{ useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open',()=> {  //once the connection is open then.
    console.log("Connection is established successfully");
});

app.get('/',function(req,res){
    res.send("Add /books in URL");
});

app.get('/books',function(req,res){
    Book.find((err,books)=>{
        if(err)
            res.send(err);
        else
            res.json(books);
    });
});

//We can find the books by specifying the attribute that we need to provide.
app.get('/books/:id',function(req,res){
    Book.findOne({
        _id : req.params.id
    }).exec((err,books)=>{
        if(err)
            res.send(err);
        else
            res.json(books);
    });
});

//These will work for x-www-form-encoded or json both

//CREATE
app.post('/book',(req,res)=>{
    //let newBook = new Book(req.body);
    //newBook.save().then(newBook=>{}).catch(err=>{})
    let newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;
    newBook.save().then(newBook=>{
        res.send(newBook);
    }).catch(err=>{
        res.send(err);
    });
});

//Update - PUT
app.put('/book/:id',(req,res)=>{
    Book.findOneAndUpdate(
    {_id:req.params.id},
    {title:req.body.title,author:req.body.author},
).then(updatedBook=>{res.send(updatedBook)})
 .catch(err=>{res.send(err)});
});

//Delete - Delete
app.delete('/book/:id',(req,res)=>{
    Book.findOneAndRemove(
    {_id:req.params.id}
).then(deletedBook=>{res.send(deletedBook)})
 .catch(err=>{res.status(202).send(err)});
});


let port = 8080;
app.listen(port,()=>{
    console.log("App listening on "+ port);
});