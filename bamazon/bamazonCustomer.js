
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: "localhost",
    port: 7000,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("WELCOME");
    queryItems();
});

function queryItems() {
    var query = connection.query(
        "SELECT * FROM products", function (err, res) {
            initializeApp(res);
          
        });
};

function initializeApp(res) {
    console.table(res);
    shop();
};

function shop() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of units of this item would you like to buy?"
        }
    ]).then(function (ans) {
        purchase(ans);
    }); 
};

function purchase(ans) {
    let id = ans.id;
        let num = ans.quantity;
        var query = connection.query(
      
            "SELECT * FROM products WHERE item_id = ?", 
            [id], function (err, res) {
                if(err) {
                    console.log(err);
                }
            let stock = res[0].stock_quantity;
            let unitCost = res[0].price;
           
            if(num > stock) {
                console.log("INSUFFICIENT QUANTITY");
                continueShopping();
            } else {
                stock = (stock - num);
                var query = connection.query(
                    "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [stock, id],
                function (err, res) {
                    if(err) {
                        console.log(err);
                    }
                    let invoice = (num * unitCost);     
                    console.log("\nSOLD\nYour total purchase cost: $" + invoice + "\n");
                    continueShopping();
                });
            };
        }); 
};
function continueShopping() {
    inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: "Would you like to continue shopping?",
            choices: ["YES", "NO"]
        }
    ]).then(function (ans) {
        let command = ans.command;
        console.log(command);
        if(command === "YES") {
            queryItems();
        } else{
            console.log("THANK YOU!")
            connection.end();
        }
    }); 
};