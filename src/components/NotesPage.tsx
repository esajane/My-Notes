import React, { useState, useEffect } from 'react';
import NoteList from './noteslist';
import AddNoteForm from './addnote';
import { Container, AppBar, Toolbar, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface NotesPageProps {
    userId: number;
}

const NotesPage: React.FC<NotesPageProps> = ({ userId }) => {
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const state = location.state as { userId: number };

    const handleNoteAdded = () => {
        setRefresh(true);
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">My Notes {userId && `: ${userId}`}</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '24px' }}>
                {userId && <AddNoteForm userId={userId} onNoteAdded={handleNoteAdded} />}
                <Paper elevation={3} style={{ marginTop: '24px', padding: '16px' }}>
                    {userId && <NoteList userId={userId} refresh={refresh} setRefresh={setRefresh} />}
                </Paper>
            </Container>
        </>
    );
};

export default NotesPage;
