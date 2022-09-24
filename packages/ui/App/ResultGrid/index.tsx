import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'services/store';
import { useCompaniesQuery } from 'services/queries';
import { Company } from 'services/types';
import CompanyItem from './Item';

const ResultGrid = (): JSX.Element => {
  const searchString = useAppSelector(({ search }) => search);
  const companiesQuery = useCompaniesQuery({ q: searchString, _limit: 10 });
  const isLoading = companiesQuery.isUninitialized || companiesQuery.isLoading;
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
        ) : (
          (companiesQuery.data || []).map((company: Company) => (
            <CompanyItem company={company} key={`company-${company.id}`} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ResultGrid;
