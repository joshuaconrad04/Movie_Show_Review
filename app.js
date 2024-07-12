import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const __dirname = "Movie_Show_Reviews";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

 app.set('view engine', 'ejs');

 //connecting to my pg database
 const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "movies",
  password: "Boomboom#1212",
  port: 5432,
});
db.connect();

//to create a new post
app.get("/new", (req, res) => {
  res.render("newpost.ejs", { heading: "New Post", submit: "Create Post" });
});


//To edit a post
app.get("/edit/:id", (req, res) => {
  const ID =req.params.id;
 


});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/delete/:id",  (req, res) => {
  try {
   
  } catch (error) {
    
  }
});






app.get('/', async(req, res) => {

  try {
    const result = (await db.query("SELECT * FROM product_reviews ORDER BY review_id ASC")).rows;
    const user=(await db.query("SELECT * FROM users ORDER BY id ASC")).rows;
    res.render("index", {
      title:'home',
      posts: result,
      users:user
    });
  } catch (err) {
    console.log(err);
  }

});

app.get('/reviews', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/search', (req, res) => {
  res.render('search', { title: 'About Us' });
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});