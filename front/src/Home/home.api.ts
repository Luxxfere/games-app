import Api from "../common/api";
import Game from "../common/types";

const fetchGames = async () => {
 const {data } =  await Api.get<Game[]>('/games');
 return data;
}

export {
    fetchGames
}