import { useNavigate, RouteComponentProps } from "@reach/router";
import {IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'

import { FC, useEffect, useState } from "react";
import Game from "../common/types";
import { fetchGames } from "./home.api";
import { Delete } from "@material-ui/icons";
import { deleteGame } from "../Games";



const Home: FC<HomeProps> = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const [games, setGames] = useState<Game[]>()

    useEffect(() => {
        const fetchGamesList = async () => {
            const gamesList = await fetchGames();
            setGames(gamesList)
        }
        fetchGamesList()
    }, [])

    const onRowClick = (gameId: string) => navigate(`games/${gameId}`)

    const onDelete = async ({gameId, event} : onDeleteArgs) => {
        event.stopPropagation();
        await deleteGame(gameId)

        setGames(prevGames => prevGames?.filter( game => game.id !== gameId))
    }

    return (
        <>
            <Typography variant="h1">Games</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Id
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Price
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games && games.map(game => 
                            <TableRow onClick={() => onRowClick(game.id)} className={classes.tableRow} hover key={game.id}>
                                <TableCell>
                                    {game.id}
                                </TableCell>
                                <TableCell>
                                    {game.name}
                                </TableCell>
                                <TableCell>
                                    {game.price}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={(event)=> onDelete({
                                        event,
                                        gameId: game.id
                                    })} color="primary">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow> )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Home;

const useStyles = makeStyles({
    tableRow: {
        cursor: 'pointer'
    }
})

interface HomeProps extends RouteComponentProps {

}

interface onDeleteArgs{
    gameId: string;
    event: React.MouseEvent<HTMLButtonElement>;
}