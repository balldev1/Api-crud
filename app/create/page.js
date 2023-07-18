
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'

const Create = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const router = useRouter();

    const handleSubmit = (e) => {

        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                alert('Create User Success')
                router.push('/')
            })
            .catch(error => console.log('error', error));
    }

    const handleBackHome = () => {
        router.push('/')
    }

    return (
        <>
            <Navbar />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Box >
                        <Typography variant="h6" gutterBottom>
                            Create User
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} >
                                    <TextField onChange={(e) => setFname(e.target.value)}
                                        id="fname" label="Firstname" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setLname(e.target.value)}
                                        id="lname" label="Lastname" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => setUsername(e.target.value)}
                                        id="username" label="Username" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => setEmail(e.target.value)}
                                        id="email" label="Email" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField onChange={(e) => setAvatar(e.target.value)}
                                        id="avatar" label="Avatar" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <Button sx={{ mt: 2 }} fullWidth type='submit'
                                        variant="outlined" size="large" >
                                        Create
                                    </Button>
                                    <Button onClick={handleBackHome}
                                        sx={{ mt: 2 }} fullWidth
                                        variant="outlined" size="large" >
                                        Back Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </React.Fragment>
        </>
    )
}

export default Create
