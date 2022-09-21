`import * as React from 'react';
import {
  Grid,
  Typography,
  List,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import { useDeleteItemMutation, useItemsQuery } from 'services/queries';
import { ListItemType } from 'services/types';
import Item from './Item';
import AddEditItem from './AddEditItem';

const ShoppingList = () => {
  const itemsQuery = useItemsQuery();
  const [deleteItem, deleteItemStatus] = useDeleteItemMutation();
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const handleDelete = React.useCallback(() => {
    if (itemToDelete) {
      deleteItem({ _id: itemToDelete });
    }
  }, [deleteItem, itemToDelete]);

  React.useEffect(() => {
    if (deleteItemStatus.isSuccess) {
      setItemToDelete(null);
    }
  }, [deleteItemStatus.isSuccess, setItemToDelete]);

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {itemsQuery.isUninitialized || itemsQuery.isLoading ? (
        <CircularProgress size={76} sx={{ mt: 15.5 }} />
      ) : itemsQuery.data?.length ? (
        <>
          <Grid
            item
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 4.375 }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
              Your Items
            </Typography>
            <AddEditItem />
          </Grid>
          <List disablePadding sx={{ width: '100%' }}>
            {itemsQuery.data.map((item: ListItemType, index: number) => (
              <Item
                key={`shopping-list-item-${index}`}
                item={item}
                onDelete={(id) => setItemToDelete(id)}
                isDeleting={deleteItemStatus.isLoading}
              />
            ))}
          </List>
        </>
      ) : (
        <Grid
          container
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          alignItems="center"
          sx={(theme) => ({
            width: 614,
            height: 290,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '5px',
            mt: 15.5,
          })}
        >
          <Typography variant="h6" color="#87898C" sx={{ mb: 2 }}>
            Your shopping list is empty :(
          </Typography>
          <AddEditItem>Add your first item</AddEditItem>
        </Grid>
      )}
      <Dialog
        open={Boolean(itemToDelete)}
        PaperProps={{ sx: { width: 410, py: 1.75, px: 0.75 } }}
      >
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <DialogContentText
            width="100%"
            height={80}
            fontSize={14}
            lineHeight={1.43}
          >
            Are you sure you want to delete this item? This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemToDelete(null)} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteItemStatus.isLoading}
            startIcon={
              deleteItemStatus.isLoading && <CircularProgress size={16} />
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ShoppingList;
