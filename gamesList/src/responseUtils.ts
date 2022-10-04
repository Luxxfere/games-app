import { ServerResponse } from "http";

const sendResponse = <T>(code: number, data: T, res: ServerResponse) => {
    res.writeHead(code, {
        'Content-Type': 'application/json',  
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
    })
    res.end(JSON.stringify(data));
}

export default sendResponse;