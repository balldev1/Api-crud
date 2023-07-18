
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useRouter } from 'next/navigation'

export default function BasicTable() {

    const router = useRouter();

    const handleEdit = (id) => {
        router.push(`/edit/${id}`);

    }

    const [items, setItems] = useState([]);

    useEffect(() => {
        userrefrest();
    }, [])



    const userrefrest = () => {
        fetch('https://www.melivecode.com/api/users')
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result)
            })
            .catch((error) => {
                console.log('Api Someone went wrong!')
            })
    }


    const handleDelete = (e) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": e
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/delete", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert('Delete User Success')
                userrefrest()
            })
            .catch(error => console.log('error', error));
    }



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Avatar</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell align="center">
                                <Box display='flex' justifyContent='center' >
                                    <Avatar alt="Remy Sharp" src={item.avatar} />
                                </Box>
                            </TableCell>
                            <TableCell align="right">{item.fname}</TableCell>
                            <TableCell align="right">{item.lname}</TableCell>
                            <TableCell align="right">{item.username}</TableCell>
                            <TableCell align="right">   <ButtonGroup size="large" aria-label="large button group">
                                <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                                <Button onClick={() => handleDelete(item.id)}
                                >Del</Button>
                            </ButtonGroup></TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}
