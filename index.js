import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;
app.use(express.json());
app.use(cookieParser())

app.post('/login', (req, res) => {
  var opts = {
    maxAge: 500000,
    httpOnly: true
  }
  if(req.cookies.name){
    res.send("You are already logged in.").end()
  } else {
    if(req.body.name){
      res.cookie('name', `${req.body.name}`, opts);
      res.status(201).send('Logged in.').end();
    }else{
      res.status(400).send('A username was not provided.').end()
    }
  }
})

app.get('/hello', (req, res) => {
  req.cookies.name ? res.status(200).send(`Welcome ${req.cookies.name}!`) : res.status(200).send('I do not know your name.')
})

app.listen(port, () => console.log(`App is listening at port ${port}`))