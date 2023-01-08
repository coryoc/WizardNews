const express = require("express");
const morgan = require("morgan");
const postBank =require("./postBank");

const app = express();

app.use(express.static('public')) 
app.use(morgan('dev'))


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



app.get("/", (req, res) => 
   {
    const posts = postBank.list();

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts.map(post => `
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
        ).join('')}
      </div>
    </body>
  </html>`

      res.send(html)
   });

   app.get('/posts/:id', (req, res, next) => {
    const id = req.params.id;
    const post = postBank.find(id);

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p>
            ${post.content}
            </p>
          </div>
      </div>
    </body>
  </html>`

  const errorPage = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            404 ERROR!!!!
          </p>
        </div>
    </div>
  </body>
</html>`

  if (post.id) {

    res.status(200).send(html)
  }
  // else if {

  // }
  else {
    res.status(404).send(errorPage)
  }

  });



  app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const post = find(id)
    if (!post.id) {
      throw new Error('Not Found')
    }
  })
  ;
  // TODO - create error handler responding with 404 status code and Not Found after reading https://expressjs.com/en/guide/error-handling.html and associated resources


 
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
