// https://github.com/chowliangwen/Soal_BE_2

const { Pool } = require('pg')

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore',
  password: 'admin1234',
  port: 5432,
});

var express = require("express");

// authorization
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

var app = express();
app.use(express.json({extended: false}));

const dayjs = require('dayjs');
let today = dayjs();

app.listen(3000, () => {
	console.log("Server running on port 3000");
});


// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('/api/createNewUser', (req, res) => {
  const token = generateAccessToken({ username: req.body.username});
  res.json(token);
});

app.post('/HOST/author/login', (req, res) => {
	var username = req.body.username;
	var verify_request = generateAccessToken({ username });

	connection.query("SELECT * FROM public.author WHERE email = '"+ username +"' ",  (err, result) => {
		var username_data = result.rows[0].email;
		var verify_request = generateAccessToken({ username_data });

		
		
	});

});

// API

// // get sales
// app.get("/HOST/sales/get_my_sales", (req, res, next) => {

// 	connection.query('SELECT * FROM public.sales',  (err, result) => {
// 		res.json(result.rows[0]);

// 		connection.end();
// 	});
// });

// // get sales by id
// app.get("/HOST/sales/get", (req, res, next) => {

// 	var id = req.query.id;

// 	connection.query('SELECT * FROM public.sales WHERE sales_id = '+ id +' ',  (err, result) => {
// 		res.json(result.rows[0]);

// 		connection.end();
// 	});

// });

// // insert sales
// app.post("/HOST/sales/add", (req, res, next) => {
// 	var name = req.body.name;
// 	var email = req.body.email;
// 	var quantity = req.body.quantity;
// 	var book_id = req.body.book_id;
// 	var book_name;
// 	var price_per_unit;
// 	var price_total;
// 	var author_id;
// 	var created_time = today.format("YYYY-MM-DD h:mm:ss");

// 	connection.query('SELECT * FROM public.book WHERE book_id = '+ book_id +' ',  (err, result) => {
// 		book_name = result.rows[0].title;
// 		price_per_unit = result.rows[0].price;
// 		price_total = quantity * price_per_unit;

// 		connection.query("SELECT * FROM public.author WHERE email = '"+ email +"' ",  (err, result_author) => {
// 			author_id = result_author.rows[0].author_id;
			
// 			const text = 'INSERT INTO public.sales (recipient_name, recipient_email, book_title, author_id, quantity, price_per_unit, price_total, created_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
// 			const values = [name,email,book_name,author_id,quantity,price_per_unit,price_total,created_time];
// 			connection.query(text, values);

// 		});

// 	});

// 	res.sendStatus(200);
// });