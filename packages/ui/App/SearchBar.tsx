import * as React from 'react';
import {
  AppBar,
  Grid,
  TextField,
  Toolbar,
  Typography,
  debounce,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'services/store';
import { search, showStarred } from 'services/searchDuck';
import { useCompaniesQuery } from 'services/queries';

const SearchBar = (): JSX.Element => {
  const { search: searchString, showStarred: isShowingStarred } =
    useAppSelector(({ search }) => search);
  const dispatch = useAppDispatch();
  const companiesQuery = useCompaniesQuery();
  const [value, setValue] = React.useState(searchString);
  const totalStarred = React.useMemo(
    () =>
      (companiesQuery.data || []).reduce(
        (total, company) => total + Number(company.starred),
        0
      ),
    [companiesQuery.data]
  );

  const debouncedSearch = React.useCallback(
    debounce((value: string) => dispatch(search(value)), 250),
    [dispatch]
  );

  React.useEffect(() => {
    debouncedSearch(value);
  }, [value]);
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
        <Grid item container component="label" alignItems="center">
          <Typography color="common.white" variant="h4" mr={0.5}>
            Find a Company:
          </Typography>
          <TextField
            type="search"
            InputProps={{
              sx: (theme) => ({
                overflow: 'hidden',
                backgroundColor: theme.palette.common.white,
              }),
            }}
            placeholder="Search for a company..."
            onChange={({ target: { value } }) => setValue(value)}
            value={value}
          />
        </Grid>
        <Grid
          container
          width="auto"
          component={Typography}
          alignItems="center"
          variant="h5"
          wrap="nowrap"
          whiteSpace="nowrap"
          onClick={() => dispatch(showStarred(!isShowingStarred))}
          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        >
          Total starred:{' '}
          {companiesQuery.isUninitialized || companiesQuery.isLoading ? (
            <CircularProgress color="inherit" size={24} sx={{ ml: 1 }} />
          ) : (
            totalStarred
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
