import { IncomingMessage } from "http";
import { Game } from "./fileOperations";

export const getDataFromRequest = <T,>(req: IncomingMessage) => new Promise<T>((res, rej) => {
    try {
        let body = '';

        req.on('data', (dataPart) => {
            body += dataPart.toString()
        })

        req.on('end', () => {
            res(JSON.parse(body) as T)
        })

    } catch (err) {
        rej(err)
    }
})