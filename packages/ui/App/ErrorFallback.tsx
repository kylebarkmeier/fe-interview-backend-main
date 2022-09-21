import { Container, Grid } from '@mui/material';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <Container role="alert">
      <Grid
        container
        direction="column"
        wrap="nowrap"
        alignItems="center"
        justifyContent="center"
      >
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </Grid>
    </Container>
  );
};

export default ErrorFallback;
