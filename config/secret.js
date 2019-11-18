module.exports = {
    database: process.env.DATABASE || "mongodb://localhost/discBack",

    secret: process.env.SECRET || 'secret',
    jwtsecret: "myjwtsecret",
  
  }