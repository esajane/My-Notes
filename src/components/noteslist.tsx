import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Paper, CircularProgress, Typography, Box } from '@mui/material';

type Note = {
    id: string;
    note: string;
    user_id: number;
};

type NoteListProps = {
    userId: number;
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
};

const NoteList: React.FC<NoteListProps> = ({ userId, refresh, setRefresh }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserNotes = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://hyeumine.com/mynotes.php?id=${userId}`);
            const notesData = response.data.notes.map((noteArray: [string, string]) => ({
                id: noteArray[0],
                note: noteArray[1],
                user_id: userId,
            }));
            setNotes(notesData);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch user's notes.");
        } finally {
            setIsLoading(false);
            if (refresh) {
                setRefresh(false);
            }
        }
    };

    useEffect(() => {
        fetchUserNotes();
    }, [userId, refresh]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="body1" color="error" align="center">
                {error}
            </Typography>
        );
    }

    return (
        <Paper elevation={1} sx={{ width: '100%',  bgcolor: 'background.paper', overflow: 'hidden' }}>
            <List>
                {notes.map((note) => (
                    <ListItem key={note.id} alignItems="flex-start">
                        <ListItemText primary={`Note: ${note.id}`} secondary={note.note} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default NoteList;
