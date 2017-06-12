
// DEPENDENCIES
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

// CONNECT TO MYSQL
var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "root",
     database: "bamazon_db"
});

// IF WE CONNECT
connection.connect(function(err) {
// DISPLAY STORE PRODUCTS     
     displayProducts();
});


// FUNCTION FOR PURCHASING PRODUCTS
function displayProducts() {
    // GRAB ALL OF OUR PRODUCTS
     connection.query("SELECT * FROM Products", function(err, bamStore) {
               console.log(" ");
               console.log("WELCOME TO SETH'S BAMAZON STORE, HERE'S OUR INVENTORY".magenta);
               console.log(" ");
               console.log("+ ----------------------------------------------------------------- +".magenta);
               console.log("| ID | Product           | Department        | Price     | Stock    |".magenta);
               console.log("+ ----------------------------------------------------------------- +".magenta);
        for(var i = 0; i < bamStore.length; i++) {
          // CREATE SPACE LOOPS TO ALIGN COLUMNS
           var colLength = (16 - bamStore[i].product_name.length);
           var spacer = (" ");
            for (var j = 0; j < colLength; j++) {
                var spacer = (spacer + " ");
            };

           var colLength2 = (16 - bamStore[i].department_name.length);
           var spacer2 = (" ");
            for (var k = 0; k < colLength2; k++) {
                var spacer2 = (spacer2 + " ");
            };
                // CONVERT THE PRICE INTO A STRING
           var lPrice = bamStore[i].price.toString();
           var colLength3 = (7 - lPrice.length);
           var spacer3 = (" ");
            for (var l = 0; l < colLength3; l++) {
                var spacer3 = (spacer3 + " ");
            };

           var mQty = bamStore[i].stock_quantity.toString();
           var colLength4 = (7 - mQty.length);
           var spacer4 = (" ");
            for (var m = 0; m < colLength4; m++) {
                var spacer4 = (spacer4 + " ");
            };
            // DISPLAY ALL STORE PRODUCTS
          	console.log("| ".magenta + bamStore[i].item_id + "  | ".magenta + bamStore[i].product_name + spacer + " | ".magenta + bamStore[i].department_name + spacer2 + " | ".magenta + "$" + bamStore[i].price + spacer3 + " | ".magenta + bamStore[i].stock_quantity + spacer4 + " |".magenta);
            }
            console.log("+ ----------------------------------------------------------------- +".magenta);
            console.log(" ");
            inquirer.prompt([
          	{
          	type: "input",
          	message: "Enter the ID of the product you would like to buy:".yellow,
          	name: "id"
          	},
            {
          	type: "input",
          	message: "Great choice! Now, how many would you like?".yellow,
          	name: "qty"
          	}
            ]).then(function (purchasedItem) { // PASS THE PURCHASED ITEM

                    // CREATE 2 VARIABLES FOR THE ITEM ID, NUMBER PURCHASED, AND PURCHASE AMOUNT
                    var itemId = purchasedItem.id;
                    var purchaseNumber = purchasedItem.qty;
                   
                        // CHECK IF WE HAVE ENOUGH IN STOCK
                    connection.query("SELECT * FROM Products WHERE item_id=" + itemId, function(err, selectedItem) {
                  
                         if (selectedItem[0].stock_quantity - purchaseNumber >= 0) {

                           var totalAmount = (selectedItem[0].price * purchaseNumber);
                         console.log(" ");  
                         console.log("YOU JUST SPENT $".green + totalAmount + " THANK YOU! ALL SALES ARE FINAL.".green);
                         console.log(" ");
                         // UPDATE THE QUANTITY IN OUR DATABASE
                          connection.query("UPDATE Products SET stock_quantity=? WHERE item_id=?", [selectedItem[0].stock_quantity - purchaseNumber, itemId],
                          // DISPLAY UPDATED INVENTORY
                           function(err, bamStore) {
                         displayProducts();
                            });  
                            // IF WE DON'T HAVE ENOUGH IN STOCK    
                         } else {
                          console.log(" ");
                          console.log("SORRY, WE DON'T HAVE ENOUGH STOCK TO FILL YOUR ORDER.".red);
                          console.log(" ");
                           displayProducts();
                         }
                    });
          });
     });
}
