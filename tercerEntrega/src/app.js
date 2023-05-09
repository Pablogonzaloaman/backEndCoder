import express from "express"
import ProductManager from "./tercerEntrega.js"
const productManager = new ProductManager("./src/tercerEntrega.json")
const app = express()
const PORT = 8080

app.get("/products", async(req, res) => {
    let products = await productManager.getProducts()
    let {limits} = req.query
    limits = parseInt(limits)

    if (limits) {
        res.status(200).send(products.slice(0, limits))
    } else {
        res.status(200).send(products)
    }
})

app.get("/products/:pid", async (req, res) => {
    let data = req.params.pid
    let product = await productManager.getProductById(data)
    res.status(200).send(product)
})



app.listen(PORT,() => {
    console.log(`server listening in port:${PORT}`)
})