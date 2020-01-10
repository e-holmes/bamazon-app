
// Node Requirements
var mysql = require("mysql");
var inquirer = require("inquirer");


// Database Details
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});


// Connect to Database and Move to fetchData Function
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    fetchData();
  });

// Fetch Data from Database
  // Then run DataDisplay and then continue to locateObject
function fetchData() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      var catalogue = res;
      dataDisplay(catalogue);
      locateObject(catalogue);
    });
  }
  
  // Sort Data and Display in Table
  function dataDisplay(hold){
    var list = hold;
    const array = [];
    for (i=0; i<10; i++){
      array.push({myId: list[i].item_ID, Product: list[i].product_name, Department: list[i].department_name, "Price($)": +list[i].price, Quantity: list[i].stock_quantity});
    }
    const transformed = array.reduce((acc, {myId, ...x}) => { acc[myId] = x; return acc}, {})

    console.table(transformed);
  }

// Ask User for Item ID then locate Item details and proceed to processOrder
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

  // Ask User for quantity of Item
    // Decide if there is enough stock
      // If enough stock update price and quantity and store through updateProduct and updateTotal. Then prompt new user total.
      // If not enough stock return error message
    // Then proceed to loopBack
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
          total = priceH * quantity;
          quantity = quantity - answer.action;
          newTotal = hold;
          newTotal = newTotal[10].price + total;
          updateProduct(itemID, quantity);
          updateTotal(newTotal);
          console.log("Your new total is: $" +newTotal);
        } else {
          console.log("Sorry, we don't have enough stock for your order!");
        }   
        loopBack();
      });
  }

  // Store new quantity amount
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
      function(err, res) {
        if (err) throw err;
      }
    );
  }

  // Store new user total
  function updateTotal(totalH) {
    connection.query(
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
      }
    );
  }

  // Ask if user would like to buy more and process answer
    // If yes then take back to initial Data Display
    // If no then end connection
  function loopBack(){
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "Would you like to buy more?(Y or N)"
      })
      .then(function(answer) {
        var answers = ["Y", "N"]
        if (answer.action == answers[0]){
          console.log("Okay, let's go back!");
          fetchData();
        }else if (answer.action == answers[1]){
          console.log("Goodbye!");
          connection.end();
        }
      });
    }