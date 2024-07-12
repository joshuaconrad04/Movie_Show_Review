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


//render the reviews page
app.get('/', async(req, res) => {

  try {
    const result = (await db.query("SELECT * FROM users INNER JOIN product_reviews ON users.id = product_reviews.user_id ORDER BY review_id ASC")).rows;
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


//to create a new post
app.get("/new", (req, res) => {
  res.render("newpost.ejs", { heading: "New Post", submit: "Create Post" });
});

//to go to edit a new post page
app.get("/edit/:id", async(req, res) => {

  const postID =req.params.id;
console.log(postID);


  try {

   const result = await db.query("SELECT * FROM product_reviews WHERE review_id = $1 ",[postID]);
  
 

    res.render("newpost.ejs", {
      heading: "Edit Post",
      submit: "Edit Post",
      post: result.rows[0],


    });
  } catch (err) {
    console.log(err);
  }


});


//To edit a post
app.patch("/editpost/:id", async (req, res) => {
  const review_id = req.params.id;
  const title = post.title;
  const review = post.review;
  const rating = post.rating;

  console.log(title);
  console.log(review);
  console.log(rating);


  

  try {
    const editPost = await db.query(
      "UPDATE product_reviews SET title = $1, review_text = $2, rating = $3 WHERE review_id = $4",
      [title, review, rating, review_id]
    );

    if (editPost.rowCount === 0) {
      // No rows were updated, which means the review_id does not exist
      return res.status(404).json({ error: "Review not found" });
    }

    console.log(`Post updated successfully with review_id: ${review_id}`);
   // res.status(200).json({ message: "Post updated successfully" });
    res.redirect("/");


  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Create a new post
app.post("/post", async (req, res) => {

 const title =  req.body.title;
const review=req.body.review;
//holds the name value for now;
const user_name= req.body.author;
const rating = req.body.rating;

console.log(title);
console.log(review);
console.log(user_name);
console.log(typeof(user_name));

console.log(rating);


  try {
    //in order to get the proper user id
    const result = await db.query("SELECT id FROM users WHERE name = $1 ", [user_name]);
    const user_id = result.rows[0].id;
    // console.log(result);
     console.log(`this is the user_id #: ${user_id}`);

    const  newPost = await db.query("INSERT INTO product_reviews (title, review_text,user_id, rating )  VALUES ($1,$2,$3,$4) ", [title,review,user_id,rating]).rows;  //in that array I need to put in the user da
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// Delete a post
app.get("/delete/:id",  (req, res) => {
  try {
   
  } catch (error) {
    
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