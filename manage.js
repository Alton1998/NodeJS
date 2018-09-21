var mysql=require('mysql');
var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database:"webdb",
});


app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/" +"Log_In.html" );
});

app.get('/adduser',function(req,res){
	res.sendFile(__dirname + "/"+"Sign_Up.html");
}); 

app.post('/signup',urlencodedParser,function(req,res)
{
	response={
	"Username":req.body.username,
	"Password":req.body.password
	}
	console.log(response);
	con.connect(function(err){
		if (err) throw err;
		console.log("Connected");
		con.query('INSERT INTO user(Username,Password) VALUES(?,?);',[req.body.username.toString(),req.body.password.toString()],function(err,result,fields)
		{
			if (err) throw err;
			console.log("User Inserted");
			 res.sendFile(__dirname + "/" +"Log_In.html");
		});
	});
});
app.post('/', urlencodedParser,function(req,res){
	response={
	"Username":req.body.username,
	"Password":req.body.password
	}
	console.log(response);
	con.connect(function(err) {
  	if (err) throw err;
  	console.log("Connected!");
	var sql="SELECT * FROM user";
	con.query(sql, function (err, result, fields) {
    	if (err) throw err;
	length=result.length
    	//console.log(result[0]['Username']);
	//console.log(result[0]['Password']);
	var i;
	for(i=0;i<length;i++)
	{
	if(result[i]['Username']==response['Username']&&result[i]['Password']==response['Password'])
		{
			console.log('Logged in');
			res.sendFile(__dirname + "/" +"main.html");
			break;
		}
	}
  	});
	});
});

var server = app.listen(8081, function () {
	console.log("Server is running");
});