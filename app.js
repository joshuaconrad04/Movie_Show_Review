import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const __dirname = "Movie_Show_Reviews";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

 app.set('view engine', 'ejs');


app.get('/reviews', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/search', (req, res) => {
  res.render('search', { title: 'About Us' });
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});