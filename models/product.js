const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product{
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products => {
            // console.log("Inside Save");
            if(this.id){
                const existingProductIdx = products.findIndex(prod => prod.id.toString() === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIdx] = this;
                // console.log("Inside editing" + updatedProducts[existingProductIdx].title);
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else{
                this.id = Math.random();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const updatedProducts = products.filter(prod => id !== prod.id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err){
                    
                }
                else {
                    console.log(err);
                }

            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static getProductDetails(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id.toString() === id);
            cb(product); 
        });
    }
};