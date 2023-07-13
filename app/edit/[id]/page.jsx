'use client'

import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/navigation'


const Edit = ({ params: { id } }) => {


    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const router = useRouter();


    useEffect(() => {

        console.log(id)

        var raw = "";

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'ok') {
                    setFname(result['user']['fname'])
                    setLname(result['user']['lname'])
                    setUsername(result['user']['username'])
                    setEmail(result['user']['email'])
                    setAvatar(result['user']['avatar'])
                }
            })
            .catch(error => console.log('error', error));
    }, [id])

    const handleSubmit = (e) => {

        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/update", requestOptions)
            .then(response => response.json())
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
                            Edit User
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} >
                                    <TextField onChange={(e) => setFname(e.target.value)} value={fname}
                                        id="fname" label="Firstname" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setLname(e.target.value)} value={lname}
                                        id="lname" label="Lastname" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => setUsername(e.target.value)} value={username}
                                        id="username" label="Username" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => setEmail(e.target.value)} value={email}
                                        id="email" label="Email" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField onChange={(e) => setAvatar(e.target.value)} value={avatar}
                                        id="avatar" label="Avatar" variant="outlined" required fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <Button sx={{ mt: 2 }} fullWidth type='submit'
                                        variant="outlined" size="large" >
                                        Edit
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

export default Edit
