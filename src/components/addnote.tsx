import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

type AddNoteFormProps = {
    userId: number;
    onNoteAdded: () => void;
};

const AddNoteForm: React.FC<AddNoteFormProps> = ({ userId, onNoteAdded }) => {
    const [note, setNote] = useState('');

    const submitNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', userId.toString());
            formData.append('note', note);

            await axios.post('http://hyeumine.com/newnote.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setNote('');
            onNoteAdded();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box component="form" onSubmit={submitNote} noValidate sx={{ mt: 1 }}>
            <TextField
                fullWidth
                id="note"
                label="New Note"
                multiline
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                margin="normal"
                variant="outlined"
                required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add Note
            </Button>
        </Box>
    );
};

export default AddNoteForm;
