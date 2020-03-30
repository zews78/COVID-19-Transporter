const express= require('express');
const app= express();
const mysql= require('mysql');
// app.get('/', (req,res)=>{
//     res.render('hello.ejs');
// });

app.use(express.static('public'));
// to recognise incoming request object as array/string
app.use(express.urlencoded({extended: false}));


const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hoster'
});

function work(){
    window.alert("Request Submitted");
}


connection.connect(function(err){
    if(err) throw err;
    console.log('connected!');

});

app.get('/',(req, res)=>{
    //display this page
    res.render('top.ejs');
});

app.get('/index', (req,res)=>{
    connection.query('SELECT * FROM Travel_List',
    (error, results)=>{
        // console.log(results);
        res.render('index.ejs',{item:results});
        }
    );
});




app.post('/create',(req,res)=>{
    connection.query(
        'INSERT INTO Travel_List(Full_Name,Telephone,Address,Travel_From,Travel_To) VALUES (?,?,?,?,?)',
        [[req.body.name],[req.body.telephone],[req.body.address],[req.body.from],[req.body.to]],
        (error, results)=>{
            connection.query(
                'SELECT * FROM Travel_List',
                (error,results)=>{
                    console.log(req.body.name);
                    console.log(req.body.telephone);
                    console.log(req.body.address);
                    console.log(req.body.from);
                    console.log(req.body.to);
                    
                    
                    
                    // console.log(req.body.itemQuant);
                    console.log(results);
                    res.render('index.ejs',{item:results});
                }
            );
        });
});

app.get('/new', (req,res)=>{
    res.render('new.ejs')
})

app.listen(3001);

