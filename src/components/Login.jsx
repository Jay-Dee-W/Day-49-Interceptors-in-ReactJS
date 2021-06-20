import { Paper, makeStyles, Typography,  TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router'

const useStyles= makeStyles({
    container: {
        display: 'flex',
        flexDirection: "column",
        gap: "18px",
        margin: "10%",
        padding: "2%"

    },
    input: {
        display: "none"
    },
})

export default function Login() {
    const history = useHistory()
    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("")
    const [error ,setError] = useState()

    // const [ loading, setLoading] = useState(false)
   

    let classes = useStyles()
    const loginUrl = 'http://localhost:3300/auth/login'

    let submitForm = async () => {
        // setLoading(true)
       

        let response = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers :{
                "Content-Type": "application/json"
            }
        })

        if (response.status !== 200){
            let errorText = await response.json()
            setError(errorText.message)
            // setLoading(false)
            return
        }
        let token = await response.json()
        console.log('login', token)
        localStorage.setItem("token", token.access_token)
        // setLoading(false)
        // console.log(history)
        history.goBack()

    }
    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant='h4'> Login </Typography>
            <TextField  value={email} onChange={e => setEmail(e.target.value)}  label="Email" name="email" variant="outlined" type="email" />
            <TextField 
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={password}
                onChange={ e => setPassword(e.target.value)}
            />
           
            <Button
                disabled={!email || !password }
                onClick={submitForm}
                variant="contained"
                color="primary" >
                 Login
                </Button>
                {error &&
            <Typography>{error}</Typography>
                }
        </Paper>
    )

}