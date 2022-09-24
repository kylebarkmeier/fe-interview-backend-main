import { Container, Grid, Typography } from '@mui/material';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}): JSX.Element => {
  return (
    <Container role="alert">
      <Grid
        container
        direction="column"
        wrap="nowrap"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Something went wrong:</Typography>
        <Typography component="code">{error.message}</Typography>
        <button onClick={resetErrorBoundary}>Try again</button>
      </Grid>
    </Container>
  );
};

export default ErrorFallback;
