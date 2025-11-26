import { Container, Typography, Box } from "@mui/material";
import React from "react";

export const HeroLibrary = () => {
    return (
        <Box sx={{ py: 8, textAlign: 'center' }}>
            <Container maxWidth="md">
                <Typography component="h1" variant="h1" color="primary" gutterBottom>
                    Anime Library
                </Typography>
            </Container>
        </Box>
    )
}