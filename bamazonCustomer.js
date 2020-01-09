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
    fetchData();
  });


function fetchData() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      var catalogue = res;
      dataDisplay(catalogue);
      locateObject(catalogue);
    });
  }
  
  function dataDisplay(hold){
    var list = hold;
    const array = [];
    for (i=0; i<10; i++){
      array.push({myId: list[i].item_ID, Product: list[i].product_name, Department: list[i].department_name, "Price($)": +list[i].price, Quantity: list[i].stock_quantity});
    }
    const transformed = array.reduce((acc, {myId, ...x}) => { acc[myId] = x; return acc}, {})

    console.table(transformed);
  }


  function locateObject(hold) {
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "What is the index number of the item you would like to purchase?"
      })
      .then(function(answer) {
        for (i=0; i<10; i++){
          var list = hold;
          if (answer.action == list[i].item_ID){
            price = list[i].price;
            amountLeft = list[i].stock_quantity;
            ID = answer.action;
          }
        }
        processOrder(amountLeft, ID, price, hold);
      });
  }

  function processOrder(quantity, itemID , priceH, hold){
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "What is the quantity of the item you would like to purchase?"
      })
      .then(function(answer) {
        if (quantity >= answer.action){
          console.log("Okay I will get on it!");
          quantity = quantity - answer.action;
          total = hold;
          total = total[10].price +priceH;
          updateProduct(itemID, quantity, total);
          console.log("Your new total is: " +total);
        } else {
          console.log("Sorry, we don't have enough stock for your order!");
        }   
        loopBack();
      });
  }

  function updateProduct(itemID, quantity, totalH) {
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: quantity
        },
        {
          item_ID: itemID
        }
      ],
      "UPDATE products SET ? WHERE ?",
      [
        {
          price: totalH
        },
        {
          product_name: "User Total"
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product updated!\n");
      }
    );
  }

  function loopBack(){
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "Would you like to buy more?(Yes or No)"
      })
      .then(function(answer) {
        var answers = ["yes", "Yes", "No", "no"]
        if (answer.action == answers[0]){
          console.log("Okay, let's go back!");
          fetchData();
        }else if (answer.action == answers[1]){
          console.log("Okay, let's go back!");
          fetchData();
        }else if(answer.action == answers[2]){
          console.log("Goodbye!");
        }else if(answer.action == answers[3]){
          console.log("Goodbye!");
        }
      });
    }