import { useEffect, useState } from 'react'
import { CircularProgress, ListItem, ListItemText, Paper, makeStyles, List, Dialog, ListItemSecondaryAction, IconButton, Typography, Divider, DialogTitle, DialogContent, Box, DialogActions, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },

}))

export default function BooksList() {
  
    const classes = useStyles()
    let [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    // const [selectedBook, setSelectedBook] = useState(null)

    const handleClickOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const url =  'http://localhost:3300/books' 
    let getBooks = async () => {
     
        let result = await axios(url)
        setBooks(result.data)
        setLoading(false)

    }
    useEffect(() => {
        getBooks()
        // eslint-disable-next-line 
    }, [])

    return (

        <Paper className={classes.customPaper} elevation={3}>
            <Typography variant='h5'>All Books</Typography>
            <Divider />
            {loading ? (<CircularProgress />)
                : (
                    <List>

                        {books.map(book => {
                            return (

                                <ListItem key={book[0]}>
                                    <ListItemText primary={book[0]}
                                        secondary={book[1]} />

                                    <ListItemSecondaryAction onClick={handleClickOpen}>
                                        <IconButton edge='end' aria-label='delete'>
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    <ConfirmDialog
                                        open={openDialog}
                                        handleClose={handleClose}
                                        book={book} />
                                </ListItem>
                            )
                        })}
                        {/* {openDiaglog && (
                <ConfirmDialog
                open={openDialog}
                hendleClose={handelClose}
                book={slectedBook}

            )} */}
                    </List>
                )
            }
        </Paper>
    )
}

function ConfirmDialog({ open, book, handleClose }) {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")

    const deleteBook = async () => {
        const url = 'http://localHost:3300/books/' + book[0];
        setDeleting(true)
        //     
        let response = await fetch(url, {
            method: "DELETE",
        })
        let status = response.status
        if (status === 201) {
            setDeleting(false)
            handleClose()
        } else {

            setDeleting(false)
            setError("book was not deleted, server response" + status)
        }
            //    let result = await response.json()
             }
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>
                    {`Are you sure you want to delete, ${book[0]} `}
                </DialogTitle>
                <DialogContent>{error}</DialogContent>
                {deleting ? (
                    <Box m={2} >
                        <CircularProgress />
                    </Box>
                ) : (
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Close
                </Button>
                        <Button onClick={deleteBook} color='primary' autoFocus>
                            Yes
                </Button>
                    </DialogActions>
                )}
            </Dialog>
             )


 }