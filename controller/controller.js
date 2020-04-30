var mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Todo1234:Todo1234@cluster0-jhupg.mongodb.net/test?retryWrites=true&w=majority')


var todoSchema = new mongoose.Schema({
    item:String,
    flag:Boolean
});


var Todo = mongoose.model('Todo',todoSchema);


var bodyParser = require('body-parser');
// parse data
var urlencodeParser = bodyParser.urlencoded({extended:false});

// var data = [
//     {item:"hello world!"},
//     {item:"hello world!!"},
//     {item:"hello world!!!"}
// ];

module.exports = function (app) {
    // get
    app.get('/todo',function (req,res) {
        Todo.find({},function (err,data) {
            if (err) throw err;

            res.render('todo',{todos:data});
        })
    });

    // post
    app.post('/todo',urlencodeParser,function (req,res) {
        console.log(req.body);
        Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });

    // delete
    app.delete('/todo/:item',function (req,res) {
        // console.log(req.params.item);
        Todo.find({item:req.params.item}).remove(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
        // data = data.filter(function (todo) {
        //     return req.params.item !== todo.item;
        // });
        //
        // res.json(data);
    });
}