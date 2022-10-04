import {appendFile, readFile, writeFile} from 'fs/promises'

export interface Game {
    name: string;
    id?: string;
    price?: number;
}

type GameWithOptionals = Omit<Game, 'id'>;

const x = {
    id: 'eft',
    name: 'Escape from Twaróg',
    price: undefined
}

const a = {
    id: 'eft',
    price: 99,
    name: undefined
}

const write = async (name: string) => {
        try {

            const result = await writeFile("./gamesList.txt", name)
        } catch (e) {
            console.error(e)
        }
        console.log("Finally")

}

export const read = () => {
    console.log("I will read")
}

const remove = () => {
    console.log(" I will remove")
};
                                //Promise<Array<Game>>
export const readAll = async ():Promise<Game[]> => {
    const buffer = await readFile('./gamesList.json', {
        encoding: 'utf-8'
    })
    return JSON.parse(buffer);
}

export const readById = async (id: string): Promise<Game> => {
    const games = await readAll()
    const game = games.find(game => game.id === id);
    if(game) {
        return game;
    } else {
        throw new Error(`There's no game with id: ${id}`)
    }
}

export const add = async (game: Game) => {
    const gamesList = await readAll()
    await writeFile('./gamesList.json', JSON.stringify([...gamesList,game]))
}

export const removeById = async (id: string) => {
    const gamesList = await readAll();
    const games = gamesList.filter(game => game.id !== id);
    await writeFile('./gamesList.json', JSON.stringify(games))
}

export const update = async (game: Partial<Game>) => {
    if(!game.id) {
        throw new Error('You have to provide an id')
    }

    const gameToUpdate = await readById(game.id);
    const updatedGame = {...gameToUpdate, ...game};
    await removeById(game.id)
    await add(updatedGame)
}


export {

    remove
}

export default write;