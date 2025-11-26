import { useState, useEffect, useMemo } from "react";
import { addFavoriteAnime } from "../store/animeSlice.js";
import { useDispatch } from "react-redux";
import { TextField, Autocomplete, CircularProgress, Box, Avatar, Typography, Container } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from "@mui/material/utils";

export const InputAnime = () => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();

    const fetchAnime = useMemo(
        () =>
            debounce(async (request, callback) => {
                try {
                    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${request.input}&limit=10`);
                    const data = await response.json();
                    callback(data.data || []);
                } catch (error) {
                    console.error("Error fetching anime:", error);
                    callback([]);
                }
            }, 500),
        [],
    );

    useEffect(() => {
        let active = true;

        if (inputValue === "") {
            setOptions(inputValue ? options : []);
            return undefined;
        }

        setLoading(true);

        fetchAnime({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];
                if (results) {
                    newOptions = [...results];
                }
                setOptions(newOptions);
                setLoading(false);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetchAnime]);

    const handleAnimeSelect = (event, newValue) => {
        if (newValue) {
            dispatch(addFavoriteAnime({
                title: newValue.title,
                image: newValue.images?.jpg?.large_image_url
            }));
            setInputValue("");
            setOptions([]);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Autocomplete
                id="anime-search"
                sx={{ width: '100%' }}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.title}
                options={options}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={handleAnimeSelect}
                renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                        <Box component="li" key={key} {...otherProps}>
                            <Avatar
                                src={option.images?.jpg?.small_image_url}
                                alt={option.title}
                                variant="rounded"
                                sx={{ mr: 2, width: 40, height: 60 }}
                            />
                            <Box>
                                <Typography variant="body1">{option.title}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {option.year ? `${option.year} • ` : ''}{option.type}
                                </Typography>
                            </Box>
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Find Anime"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1 }}>
                                    <SearchIcon color="action" />
                                </Box>
                            ),
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Container>
    );
}
