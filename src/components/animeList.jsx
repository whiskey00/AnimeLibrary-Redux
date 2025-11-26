import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteAnime } from "../store/animeSlice.js";
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Container,
    Typography,
    Fade,
    Box,
    CardMedia
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MovieIcon from '@mui/icons-material/Movie';

export const AnimeList = () => {
    const anime = useSelector((state) => state.anime.anime);
    const dispatch = useDispatch();

    const handleRemoveAnime = (id) => {
        dispatch(removeFavoriteAnime(id));
    };

    if (anime.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    No anime in your library yet. Add some above!
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {anime.map((item) => (
                    <Fade in={true} key={item.id} timeout={500}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                elevation={2}
                                sx={{
                                    height: '320px',
                                    width: '220px',
                                    margin: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                {item.image ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.image}
                                        alt={item.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
                                        <MovieIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="subtitle1" component="div" align="center" sx={{ fontWeight: 'bold', lineHeight: 1.2, fontSize: '0.9rem' }}>
                                        {item.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', pb: 1, pt: 0 }}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleRemoveAnime(item.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Fade>
                ))}
            </Grid>
        </Container>
    );
};