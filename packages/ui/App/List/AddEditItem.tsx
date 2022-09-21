import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Toolbar,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { SkipNextOutlined } from '@mui/icons-material';
import { useAddItemMutation, useEditItemMutation } from 'services/queries';
import { ListItemType } from 'services/types';
import { Box } from '@mui/system';

const MAX_QUANTITY = 10;
const OPTIONS = new Array(MAX_QUANTITY).fill(0).map((_, index) => index + 1);

const AddEditItem = ({
  component: Component = Button,
  children = 'Add Item',
  item,
  ...props
}: {
  component?: React.ElementType;
  children?: React.ReactNode;
  item?: ListItemType;
} & $ElementProps<typeof Button>) => {
  const [addItem, addItemStatus] = useAddItemMutation();
  const [editItem, editItemStatus] = useEditItemMutation();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(item?.name || '');
  const [description, setDescription] = React.useState(item?.description || '');
  const [quantity, setQuantity] = React.useState(item?.quantity || 0);
  const [purchased, setPurchased] = React.useState(item?.purchased || false);

  const isLoading = addItemStatus.isLoading || editItemStatus.isLoading;

  const resetQueries = React.useCallback(() => {
    addItemStatus.reset();
    editItemStatus.reset();
  }, [addItemStatus, editItemStatus]);

  const resetItem = React.useCallback(() => {
    setName(item?.name || '');
    setDescription(item?.description || '');
    setQuantity(item?.quantity || 0);
    setPurchased(item?.purchased || false);
  }, [item]);

  const handleClickOpen = React.useCallback(() => {
    resetItem();
    setOpen(true);
  }, [resetItem]);

  const handleClose = React.useCallback(() => {
    resetQueries();
    setOpen(false);
  }, [resetQueries]);

  const handleSave = React.useCallback(() => {
    if (item) {
      editItem({
        _id: item._id,
        name,
        description,
        quantity,
        purchased,
      });
    } else {
      addItem({ name, description, quantity });
    }
  }, [editItem, addItem, item, name, description, quantity, purchased]);

  React.useEffect(() => {
    if (addItemStatus.isSuccess || editItemStatus.isSuccess) {
      handleClose();
    }
  }, [addItemStatus.isSuccess, editItemStatus.isSuccess, handleClose]);

  return (
    <>
      <Component onClick={handleClickOpen} {...props}>
        {children}
      </Component>
      <Dialog open={open} onClose={handleClose}>
        <Toolbar
          component={Grid}
          container
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ backgroundColor: '#FAFAFA', mb: 3.5 }}
        >
          <Typography
            fontWeight="600"
            fontFamily="Dosis"
            fontSize={18}
            textTransform="uppercase"
          >
            Shopping List
          </Typography>
          <IconButton onClick={handleClose} edge="end">
            <SkipNextOutlined />
          </IconButton>
        </Toolbar>

        <DialogContent sx={{ py: 0 }}>
          <Typography mb={0.625} fontSize={18}>
            {item ? 'Edit' : 'Add'} an item
          </Typography>
          <Typography mb={1.625} color="textSecondary">
            {item ? 'Edit' : 'Add'} your {!item && 'new'} item below
          </Typography>
          <TextField
            required
            autoFocus
            name="name"
            label="Item Name"
            fullWidth
            onChange={({ target: { value } }) => setName(value)}
            value={name}
            sx={{ mb: 2.25 }}
          />
          <TextField
            multiline
            name="description"
            label="Description"
            rows={5}
            fullWidth
            inputProps={{ maxLength: 100 }}
            onChange={({ target: { value } }) => setDescription(value)}
            value={description}
            helperText={`${description.length}/100`}
            sx={{ mb: 1.75, position: 'relative' }}
            FormHelperTextProps={{
              sx: { position: 'absolute', bottom: 5, right: 0 },
            }}
          />
          <TextField
            required
            select
            name="quantity"
            label="How many?"
            fullWidth
            onChange={({ target: { value } }) => {
              if (typeof value === 'number') {
                setQuantity(value);
              }
            }}
            value={quantity || ''}
            sx={{ mb: item ? 3.75 : 34.25 }}
          >
            {OPTIONS.map((option) => (
              <MenuItem key={`quantity-option-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {Boolean(item) && (
            <Box
              component="label"
              mb={28.25}
              color="#C6C6C6"
              display="flex"
              alignItems="center"
            >
              <Checkbox
                sx={{ p: 0, mr: 1.625 }}
                checked={purchased}
                onChange={(event, checked) => setPurchased(checked)}
              />{' '}
              Purchased
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name || !quantity || isLoading}
            startIcon={isLoading && <CircularProgress size={16} />}
          >
            {item ? 'Save Item' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEditItem;
