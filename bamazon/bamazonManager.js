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
    console.log("connected as id " + connection.threadId + "\n");
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "what is your name?"
        }
    ]).then(function (ans) {
        let name = ans.name;
        assignTask(name);
    });
});

function assignTask(name) {
    inquirer.prompt([
        {
            name: "task",
            type: "list",
            message: name + ", Choose One",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (ans) {
        let task = ans.task;
        switch(task) {
            case "View Products for Sale":
                productsForSale(name);
            break;
            case "View Low Inventory":
                lowInventory(name);
            break;
            case "Add to Inventory":
                addInventory(name);
            break;
            case "Add New Product":
                addProduct(name);
            break;
        }; 
    });
};
function productsForSale(name) {
    var query = connection.query(
        "SELECT * FROM products", function (err, res) {
            console.log("PRODUCTS FOR SALE:-------------------");
            console.table(res);
            assignTask(name);
    });
};
function lowInventory(name) {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            console.log("\n" + name + ", the following products may need stocking soon!\n-------------------");
            console.table(res);
            assignTask(name);
    });
};
function addInventory(name) {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the ID number of the item you would like to stock?"
        }, 
        {
            name: "restock",
            type: "input",
            message: "How many will you be adding to the stock?"
        }
    ]).then(function (ans) {
        let id = ans.item;
        let restock = ans.restock;
        var query = connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
            [restock, id],
        function (err, res) {
            if(err) {
                console.log(err);
            };
            console.log("\nUPDATED\nYou have added " + restock + " to the stock of item # " + id + "\n");
            endOfDay(name);
        }); 
    }); 
};
function addProduct(name) {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Which is the name of the item you would you like to add?"
        }, 
        {
            name: "dept_name",
            type: "list",
            message: "What department is the product part of?",
            choices: ["Electronics", "Games", "Books"]
        },
        {
            name: "price",
            type: "input",
            message: "What is the cost of this item?"
        }, 
        {
            name: "stock_quantity",
            type: "input",
            message: "How many of this item are you stocking?"
        }
    ]).then(function (ans) {
        let product_name = ans.product_name;
        let dept_name = ans.dept_name;
        let price = ans.price;
        let stock_quantity = ans.stock_quantity;
        var query = connection.query(
            "INSERT INTO products(product_name, dept_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
            [product_name, dept_name, price, stock_quantity],
        function (err, res) {
            if(err) {
                console.log(err);
            };
            console.log("\nYou have succesfully inserted " + stock_quantity + " of " + product_name + "\n");
            endOfDay(name);
        }); 
    });
};
function endOfDay(name) {
    inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: "Do you have more tasks to complete?",
            choices: ["YES", "NO"]
        }
    ]).then(function (ans) {
        let command = ans.command;
        switch(command) {
            case "YES":
                assignTask(name);
            break;
            case "NO":
                goodbye(name);
        }
    });
};
function goodbye(name) {
    console.log("\n" + name + ", thank you for your service to Bamazon\n")
    connection.end();
}