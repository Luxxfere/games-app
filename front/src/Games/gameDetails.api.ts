import Api from "../common/api"
import Game from "../common/types";

const fetchGame = async (id:string) => {
 const { data } = await Api.get<Game>(`/games/${id}`)
 return data;
}

const createGame = async (game: Game) => {
    const {data} = await Api.post<Game, Game>({
        url: '/games',
        data: game
    })
    return data
}

const updateGame = async (game: Game) => {
    const {data} = await Api.patch<Game, Game>({
        url: `/game/${game.id}`,
        data: game
    })
    return data
}

const deleteGame = async (gameId: string) => {
    const {data} = await Api.delete<Game[]>(`/games/${gameId}`)
    return data;
}

export {
    fetchGame,
    createGame,
    updateGame,
    deleteGame
}