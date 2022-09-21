import { Container, Toolbar, Typography } from '@mui/material';
import ShoppingList from 'App/List';

const App = () => (
  <>
    <Toolbar
      sx={{
        backgroundColor: '#4D81B7',
      }}
    >
      <Typography
        fontWeight="600"
        color="white"
        fontSize={18}
        textTransform="uppercase"
        fontFamily="Dosis"
      >
        Shopping List
      </Typography>
    </Toolbar>
    <Container>
      <ShoppingList />
    </Container>
  </>
);

export default App;
