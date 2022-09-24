import * as React from 'react';
import {
  AppBar,
  TextField,
  Toolbar,
  Typography,
  debounce,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'services/store';
import { search } from 'services/searchDuck';
import { useCompaniesQuery } from 'services/queries';

const SearchBar = (): JSX.Element => {
  const searchString = useAppSelector(({ search }) => search);
  const dispatch = useAppDispatch();
  const companiesQuery = useCompaniesQuery();
  const totalStarred = React.useMemo(
    () =>
      (companiesQuery.data || []).reduce(
        (total, company) => total + Number(company.starred),
        0
      ),
    [companiesQuery.data]
  );
  return (
    <AppBar position="sticky">
      <Toolbar
        component="nav"
        sx={{
          p: 1,
          direction: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          type="search"
          sx={(theme) => ({
            color: theme.palette.common.white,
          })}
          label="Find a Company"
          placeholder="Search for a company..."
          onChange={({ target: { value } }) => dispatch(search(value))}
          value={searchString}
        />
        <Typography variant="h5">Total starred: {totalStarred}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
