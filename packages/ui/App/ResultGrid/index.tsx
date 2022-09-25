import * as React from 'react';
import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
  useAppSelector,
} from 'services/store';
import { useCompaniesQuery } from 'services/queries';
import { Company } from 'services/types';
import CompanyItem from './Item';
import { Error } from '@mui/icons-material';

const ResultGrid = (): JSX.Element => {
  const { search: searchString, showStarred } = useAppSelector(
    ({ search }) => search
  );
  const companiesQuery = useCompaniesQuery(
    showStarred ? { starred: true } : { q: searchString || '', _limit: 10 }
  );
  const isLoading = companiesQuery.isUninitialized || companiesQuery.isLoading;
  const errorMessage = React.useMemo(() => {
    let message = '';
    if (companiesQuery.isError) {
      const err = companiesQuery.error;
      message = 'Unknown Error';
      if (isFetchBaseQueryError(err)) {
        message = 'error' in err ? err.error : JSON.stringify(err.data);
      } else if (isErrorWithMessage(err)) {
        message = err.message;
      }
    }
    return message;
  }, [companiesQuery.isError, companiesQuery.error]);
  return (
    <Container maxWidth="xl" component="main" sx={{ mt: 2 }}>
      <Typography variant="h5">Companies:</Typography>
      <Grid
        component={Paper}
        elevation={4}
        container
        alignItems="center"
        justifyContent={isLoading ? 'center' : 'space-around'}
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 8,
          p: 4,
          mt: 1,
          minHeight: 1100,
        })}
      >
        {isLoading ? (
          <CircularProgress size={128} />
        ) : errorMessage ? (
          <Alert role="error" severity="error" icon={<Error />} elevation={2}>
            {errorMessage}
          </Alert>
        ) : (
          (companiesQuery.currentData || []).map((company: Company) => (
            <CompanyItem company={company} key={`company-${company.id}`} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ResultGrid;
