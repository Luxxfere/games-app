
import { createInterface } from "readline";
import { prompt } from 'inquirer';
import writeToFile, { add, Game, read, readAll, readById, remove, remove as removeEntry, removeById, update } from "./fileOperations";
import { createServer, METHODS, RequestListener } from "http";
import { getDataFromRequest } from "./getDataFromRequest";
import sendResponse from "./responseUtils";
import { send } from "process";

process.on("beforeExit", () => {
    console.log("I will exit soon")
})

process.on('exit', () => {
    console.log("I will exit")
})

process.on("uncaughtException", (err) => {
    console.log("OH NO A HUGE ERROR")
    console.log(err)
})

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
})

// readline.question("What is your favorite game?", async (answer) => {
//      writeToFile(answer, () => {});
//     process.exit(0) 
// })

const req =  {
    url: '',
    method: ''
}

enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS'
}

const requestListener: RequestListener = async (req, res) => {
    const {url, method} = req;
    console.log(method)
    if(req.method === HTTPMethod.OPTIONS){
        sendResponse(200, null, res);
    } else if(url === '/games' && method === HTTPMethod.GET ) {
       const result =  await readAll() 
       sendResponse(200, result, res)
    }  else if (url.match(/\games\/\w+/) && method === HTTPMethod.GET) {
        // /games/eft
        const id = url.split("/")[2]
        try {
            const result = await readById(id)
            sendResponse(200, result, res)
        } catch (e) {
            sendResponse(404, {errorMessage: e.message}, res)
    
        }
    } else if (url === "/games"  && method === HTTPMethod.POST) {
        const data = await getDataFromRequest<Game>(req)
        await add(data);
        sendResponse(201, data, res)
    } else if (url.match(/\games\/\w+/) && HTTPMethod.PATCH === method) {
        const id = url.split("/")[2]
        console.log(id)
        const data = await getDataFromRequest<Partial<Game>>(req);
        try {
            await update({id, ...data})
            sendResponse(200, data, res)
        }   catch (e) {
            sendResponse(404, {errorMessage: e.message}, res)
        
        }
        
    } else if (url.match(/\games\/\w+/) && method === HTTPMethod.DELETE) {
        const id = url.split("/")[2]
        try {

            await removeById(id);
            sendResponse(200, {message: 'Entry deleted'}, res)
        } catch (e) {
            sendResponse(404, {errorMessage: e.message}, res)
        }
    }
    
}


createServer(requestListener).listen(8080)