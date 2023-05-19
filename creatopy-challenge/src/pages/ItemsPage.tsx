import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Stack,
  TableRow,
  TextField,
  TableCell, TableBody, TableHead, Table, Paper, TableContainer, Alert, Snackbar
} from '@mui/material';
import { addItem, Item, loadItems } from '../features/items/itemsSlice';
import { CREATE_ITEM_MUTATION, GET_ITEMS_QUERY } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { RootState } from '../features/store';

const ItemsPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const items = useSelector((state: RootState) => state.items.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const [newItemTitle, setNewItemTitle] = useState('');
  const dispatch = useDispatch();
  const [createItem] = useMutation(CREATE_ITEM_MUTATION)
  const { loading, error, data } = useQuery(GET_ITEMS_QUERY);

  useEffect(() => {
    if (data && data.items) {
      dispatch(loadItems(data.items));
    }
  }, [data]);

  const handleAddItem = async () => {
    try {
      if (!user) {
        console.error('User is not logged it:');
        return;
      }
      const { data } = await createItem({ variables: { title: newItemTitle, userId: user.id } });
      dispatch(addItem(data.createItem));
      setNewItemTitle('');
      setOpen(true);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (loading) return <Stack>Loading...</Stack>;
  if (error) return <Stack>Error: {error.message}</Stack>;

  return (
    <Stack sx={{width: '40%', p: 4}}>
      <Stack sx={{maxWidth: 400, mb: 2}}>
        <TextField
          label="Add new item"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddItem} sx={{mt: 1}}>
          Add Item
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell align="right"><b>User email</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">{item.user && item.user.email}</TableCell>
              </TableRow>
            ))}
            {
              !items && 'No data...'
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Item successfully added!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ItemsPage;
