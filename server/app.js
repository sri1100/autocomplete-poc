/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const hostname = 'localhost';
const port = 3035;

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    // res.header('Access-Control-Allow-Origin', '*');
    // console.log('req.url',query.searchTerm);
    // .. Here you can create your data response in a JSON format
    try {
        const searchTerm = query.searchTerm
        if (searchTerm && searchTerm.length) {
            const filteredData = data.filter((item) => {
                console.log('searchTerm', searchTerm);
                console.log('item.name', item.name.toString());
                const searchFound = item.name.includes(searchTerm)
                console.log('searchFound', searchFound);
                return searchFound
            });
            console.log('filteredData', filteredData)
            console.log('res', res);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
            res.write(JSON.stringify({ searchResults: filteredData }))
        } else {
            res.write({ searchResults: [] }); // Write out the default response
        }
        res.end();
    } catch(error) {
        // res.setHeader("Content-Type", "application/json");
        // res.writeHead(200);
        res.write('No results found!'); // Write out the default response
        res.end();
    }
   
}).listen(port);


console.log(`[Server running on ${hostname}:${port}]`);
