const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId


class User {
  constructor(username, email) {
    this.name = username;
    this.email = email
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) }) // using object id cause it does not store it as string store as object id cause it used BSON
      .then(user => {
        console.log(user)
        return user
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = User;
