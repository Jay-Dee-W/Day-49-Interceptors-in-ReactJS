import { Paper, makeStyles, Typography,  TextField, Button } from '@material-ui/core'
import { useState } from 'react'

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

export default function SignUp() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    // const [ loading, setLoading] = useState(false)
   

    let classes = useStyles()
    const signUpUrl = 'http://localhost:3300/auth/signup'

    let submitForm = async () => {
        // setLoading(true)
        let formData= new FormData()
        formData.append("name", name)
        formData.append("password", password)
        formData.append("email", email)
        if (image != null) formData.append("profilePic", image )

        let response = await fetch(signUpUrl, {
            method: 'POST',
            body: formData
        })

        if (response.status !== 201){
            // console.log(await response.text)
            // setLoading(false)
            return
        }
        let result = await response.json()
        console.log(result)
        // setLoading(false)

    }
    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant='h4'> Sign Up</Typography>

            <TextField  value={name} onChange={e => setName(e.target.value)} label="Name" name="name" variant="outlined" />
            <TextField  value={email} onChange={e => setEmail(e.target.value)}  label="Email" name="email" variant="outlined" type="email" />
            <TextField 
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={password}
                onChange={ e => setPassword(e.target.value)}
            />
            <TextField 
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={ e => setConfirmPassword(e.target.value)}
             />
            <input
                accept="image/*"
                className={classes.input}
                id="profilePic"
                type="file"
                name='profilePic'
                onChange={e => setImage(e.target.files[0])} />
            <label htmlFor='profilePic'>
                <Button variant="contained" color="primary" component="span">
                    Upload Profile pic
                </Button>
                <Typography variant='p'> {image.name}</Typography>
            </label>
           
            <Button
                disabled={!name || !email || !password || password !==confirmPassword}
                onClick={submitForm}
                variant="contained"
                color="primary" >
                    Submit
                </Button>
        </Paper>
    )

}