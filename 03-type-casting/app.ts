import { createServer } from 'yasui';
import { ProductsController } from './products.controller.js';


await createServer({
  controllers: [ProductsController],
  port: 3000
});


console.log(`
  Type Casting Demo

  Available endpoints:
    GET http://localhost:3000/api/products
    GET http://localhost:3000/api/products/:id

  Try these query parameters:
    ?minPrice=50&maxPrice=200     (numbers)
    ?inStock=true                 (boolean)
    ?categories=electronics,audio (array)
    ?limit=3                      (number)
`);
