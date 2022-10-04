import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps, useNavigate } from "@reach/router"
import React, { FC, useEffect, useState } from "react"
import { updateJsxFragment } from "typescript";
import Game from "../common/types";
import { fetchGame, createGame, updateGame, deleteGame } from "./gameDetails.api";




const GameDetails: FC<GameDetailsProps> = ({ gameId }) => {

    const navigate = useNavigate();
    const classes = useStyles()
    const [game, setGame] = useState<Game>();
    useEffect(() => {
        if(!gameId) {
            return
        }
        
        fetchGame(gameId).then(game => setGame(game) )
    }, [gameId])

    const onFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {value, name}} = e;
        console.log(value, name)

        setGame(prevValue => {
            if(prevValue) {
                return {
                    ...prevValue,
                    [name]: value
                } as Game
            } else {
                return {
                    [name]: value
                } as unknown as Game
            }
        })
    }

    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if(!game){
            return
        }

        if(!gameId){
            await createGame(game)
        } else {
            await updateGame(game)
        }

        navigate("/")
    }

    const onDelete = async () => {
        if(!gameId){
            return
        }

        await deleteGame(gameId);
        navigate('/')
    }


    return (
        <>
            <Typography>{gameId || "New game" }</Typography>
            <form className={classes.form} onSubmit={onFormSubmit}>
                <Box marginX="auto" maxWidth="480px" display="flex" justifyContent="center" flexDirection="column">
                    <TextField onChange={onFormValueChange} className={classes.textField}  value={game?.id || ""} name="id" placeholder="id"/>
                    <TextField  onChange={onFormValueChange} className={classes.textField} value={game?.name || ""} name="name" placeholder="name"/>
                    <TextField  onChange={onFormValueChange} className={classes.textField} value={game?.price || 0} name="price" placeholder="price" type="number"/>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button onClick={onDelete} disabled={!gameId} variant="text" color="secondary">Delete</Button>
                </Box>
            </form>
        </>
    )
}

export default GameDetails;

interface GameDetailsProps extends RouteComponentProps {
    gameId?: string
}

const useStyles = makeStyles({
    form: {
        margin: '0 auto'
    },
    textField: {
        marginBottom: '16px'
    }
})