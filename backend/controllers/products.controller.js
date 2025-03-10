import { pool } from "../db/mysqldb.js";


export const products = (req, res) => {

    const productQuery = 'SELECT * FROM products';

    pool.query(productQuery, (err, results) => {
        if(err){
            console.log(err);
        }
        const products = results;
        console.log(products);
        res.status(200).json({success: true, products});
    })
}