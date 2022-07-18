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

var app = express();
app.use(express.json({extended: false}));

const dayjs = require('dayjs');
let today = dayjs();

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

// API
// get book
app.get("/HOST/book/get_my_book", (req, res, next) => {

	connection.query('SELECT * FROM public.book',  (err, result) => {
		res.json(result.rows[0]);

		connection.end();
	});
});

// get book by id
app.get("/HOST/book/get", (req, res, next) => {

	var id = req.query.id;

	connection.query('SELECT * FROM public.book where book_id = '+ id +' ',  (err, result) => {
		res.json(result.rows[0]);

		connection.end();
	});
});

// insert book
app.post("/HOST/book/add", (req, res, next) => {
	var title = req.body.title;
	var author_id = req.body.author_id; 
	var summary = req.body.summary; 
	var stock = req.body.stock; 
	var price = req.body.price; 
	var cover_url = req.body.cover_url; 
	var created_time = today.format("YYYY-MM-DD h:mm:ss");

	const text = 'INSERT INTO public.book (title, author_id, summary, stock, price, cover_url, created_time) VALUES ($1, $2, $3, $4, $5, $6, $7)';
	const values = [title,author_id,summary,stock,price,cover_url,created_time];
	connection.query(text, values);

	res.sendStatus(200);
});

// update book
app.put("/HOST/book/update", (req, res, next) => {
	var id = req.body.id; 
	var title = req.body.title; 
	var summary = req.body.summary; 
	var stock = req.body.stock; 
	var price = req.body.price; 
	var created_time = today.format("YYYY-MM-DD h:mm:ss");

	const text = 'UPDATE public.book SET title = $1, summary = $2, stock = $3, price = $4, created_time = $5 WHERE book_id = $6';
	const values = [title,summary,stock,price,created_time,id];
	connection.query(text, values);

	res.sendStatus(200);
});

// delete book
app.get("/HOST/book/delete", (req, res, next) => {
	var id = req.query.id; 
	
	const text = 'DELETE FROM public.book WHERE book_id = $1';
	const values = [id];
	connection.query(text, values);

	res.sendStatus(200);
});


