import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title, 
            description,
            price, 
            thumbnail, 
            code,
            stock
            } 
        if(!this.products.some(p => p.code === product.code)) {
            this.products.push({...product, id: this.products.length + 1})
            let productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)
        }else{
            console.log("Product is already added")
        }
     }
    
     async getProducts() {
        let data = await fs.promises.readFile(this.path, "UTF-8")
        return JSON.parse(data)   
    }
    
    async getProductById(id) {
        let data = await this.getProducts()
        return data.find(product => product.id == id)
        }
    
    updateProduct(id, title, description, price, thumbnail, code, stock) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let productFound = dataParse.findIndex(product => product.id === id)
        const updatedProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code, 
            stock
        }
        dataParse[productFound] = updatedProduct
        fs.writeFileSync(this.path, JSON.stringify(dataParse))
        console.log(dataParse)
          
    }

    deleteProduct(id) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data)
        let index = dataParse.findIndex(product => product.id === id)
        if(index === -1) {
            console.log("product not found")
        }else{
            dataParse.splice(index, 1)
            fs.writeFileSync(this.path, JSON.stringify(dataParse))
             console.log("Product was deleted")
        }     
    }
}

















