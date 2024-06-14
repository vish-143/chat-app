import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import SideNavBar from '../../components/SideNavBar';
import "@assets/style/home.css";

function Home() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <SideNavBar />
        </Box>
    );
}

export default Home;


