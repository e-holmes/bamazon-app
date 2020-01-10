# bamazon-app

## What can bamazon-app do?
#### This app allows you to shop on your favorite Bamazon site!

## Index
* bamazonCustomer.js
    * Node Requierments
        * You will need mySQL and inquirer to run this app.
    
    * Database Details
        * Store your password here.

    * Connect to Database
        * Creates the initial connection to Database.
        * Runs the fetchData function for the first time.
    
    * Functions
        * fetchData
            * Pulls down data from database and stores it.
            * Runs dataDisplay function.
            * Runs locatObject function.
        
        * dataDisplay
            * Processes the data pulled and gets products to place on table.
            * Displays the table for user to view.

        * locateObject 
            * Prompts the user to enter the ID number of the object they would like to buy.
            * Fetches all information related to the object and stores it.
            * Runs processOrder function.
        
        * processOrder
            * Prompts the user to enter the quantity they would like to buy.
            * Check the quantity of the item you have against the users answer.
            * If you have enough stock;
                * Figure out total of new purchase based on price and quantity.
                    * Add new total to the running total.

                * Subtract user's purchase quantity from old stock amount.
                * Runs updateProduct function.
                * Runs updateTotal function.
                * Alert user to new running total.

            * If you DON'T have enough stock then alert user.
            * Runs loopBack function.

        * loopBack
            * Prompt user if they would like to buy more.
            * Evaluate user answer
                * If "Yes" then loop back to fetchData function.
                * If "No" then end connection and alert "Goodbye!".


* schema.sql
    * Create the database.

    * Create the table and columns within database.

    * Store Data in tables.


## How to Use

1. Type "node bamazonCustomer.js" in the command bar without quotes.

2. Type the number of the item you wish to purchase into the command bar and hit enter.

3. Type the numerical quantitiy of the product you would like to purchase and hit enter.

4. If you would like to buy more type "Y" into the console without quotes and hit enter. If you would like to end your session type "N" in the command line without the quotes and hit enter.

## Video of App Running


## Link to Repository


## Technologies Used
* mySQL database

* inquirerJS

## App Developement & Maintenance
#### Created and Maintained by Elizabeth Holmes
###### Contact: apples@bananas.com