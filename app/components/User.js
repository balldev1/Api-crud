
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Table from './Table'
import { useRouter } from 'next/navigation';

export default function SimpleContainer() {

    const router = useRouter();

    const handleCreate = () => {
        router.push('./create')
    }

    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }} variant="outlined" square>
                    <Box display='flex' sx={{ pb: 2 }} >
                        <Box sx={{ flexGrow: 1, fontSize: 'h6.fontSize' }} >User</Box>
                        <Box >
                            <Button onClick={handleCreate}
                                variant="outlined" size="large" >
                                Create  <Box component={AddIcon} />
                            </Button>
                        </Box>
                    </Box>

                    <Table />
                </Paper>
            </Container>
        </React.Fragment >
    );
}
