var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1234",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readColleges();
  });


function readColleges() {
    connection.query("SELECT item_ID, product_name, price FROM products", function(err, res) {
      if (err) throw err;

      const array = [];
      for (i=0; i<10; i++){
        array.push({myId: res[i].item_ID, Product: res[i].product_name, "Price($)": +res[i].price});
      }
      const transformed = array.reduce((acc, {myId, ...x}) => { acc[myId] = x; return acc}, {})

      console.table(transformed);
      connection.end();
    });
  }


