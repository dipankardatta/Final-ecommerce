const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64994adb836c12c399610e95')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://dipankarzeus10:Mylovemom10@cluster0.v2es2ck.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().THEN(user => {
      if (!user) {
        const user = new User({
          name: 'Dipankar',
          email: 'dipankar@gmail.com',
          cart: {
            items: []
          }
        });
        user.save()
      }
    })
    app.listen(3000)
  }).catch(err => {
    console.log(err)
  })
