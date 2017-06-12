
var prompt = require("prompt");
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

var connection = mysql.createConnection({
     host: "localhost",
     port: 8889,
     user: "root",
     password: "root",
     database: "bamazon_db"
});

connection.connect(function(err) {
// IF WE HAVE AN ERROR CONNECTING LETS SEE IT    
     if (err) throw err;
//OTHERWISE DISPLAY STORE PRODUCTS     
     displayProducts();
});

function displayProducts() {
     connection.query("SELECT * FROM Products", function(err, inventory) {
     	if (err) throw err;
               console.log("Bamazon Inventory");
               console.log("| ID | Product | Department | Price | Quantity |");
               console.log("| -------------------------------------------- |");
               for(var i = 0; i < inventory.length; i++) {
          	console.log("| " + inventory[i].item_id + "  | " + inventory[i].product_name + " | " + inventory[i].department_name + " | " +  inventory[i].price + " | " + inventory[i].stock_quantity + " |");
          }

          inquirer.prompt([

          	{
          		type: "input",
          		message: "What is the id of the item you would like to buy?",
          		name: "id"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}
