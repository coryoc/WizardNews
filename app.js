const express = require("express");
const morgan = require("morgan");
const postBank =require("./postBank");

const app = express();

app.use(express.static('public')) 
app.use(morgan('dev'))



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
            404 - Page Not Found
          </p>
        </div>
    </div>
  </body>
</html>`

  if (post.id) {

    res.status(200).send(html)
  }

  
  else {
    res.status(404).send(errorPage)
  }

  });



  app.use((error, req, res, next) => {
    console.error(error)
    res.status(404).send('Page Not Found')
  })
  

 
  const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
