import * as React from 'react';
import { Company } from 'services/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { Business, Place, Star, StarOutline } from '@mui/icons-material';
import { useEditCompanyMutation } from 'services/queries';
import Formatters from 'utils/formatters';
import MapBox from './MapBox';

const TextWithIcon = ({
  icon,
  children,
  ...props
}: {
  icon: React.ReactNode | Array<React.ReactNode>;
  children: React.ReactNode;
}) => (
  <Grid
    container
    alignItems="center"
    wrap="nowrap"
    justifyContent="space-between"
  >
    {icon}
    <Grid
      container
      item
      direction="column"
      justifyContent="center"
      sx={{ ml: 1 }}
      {...props}
    >
      {children}
    </Grid>
  </Grid>
);

const CompanyItem = ({ company }: { company: Company }): JSX.Element => {
  const [editCompany, editCompanyStatus] = useEditCompanyMutation();

  const handleStar = React.useCallback(
    (event: Event) => {
      event.stopPropagation();
      editCompany({ id: company.id, starred: !company.starred });
    },
    [editCompany, company.id, company.starred]
  );
  return (
    <Card
      component="article"
      onClick={handleStar}
      raised
      sx={{
        width: 256,
        height: 512,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {company.image ? (
        <CardMedia
          component="img"
          height={256}
          width={256}
          image={company.image}
          title={company.name}
          alt={company.description || company.name}
        />
      ) : (
        <MapBox address={company.address} />
      )}
      <CardContent
        component={Grid}
        container
        flex={1}
        direction="column"
        justifyContent="space-around"
      >
        <TextWithIcon icon={<Business />}>
          <Typography variant="h6">{company.name}</Typography>
          {company.description && (
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {company.description}
            </Typography>
          )}
        </TextWithIcon>
        <TextWithIcon
          icon={<Place />}
          component="a"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            Formatters.Address.full(company.address)
          )}`}
          onClick={(event: Event) => event.stopPropagation()}
        >
          <Typography>{company.address.address1}</Typography>
          <Typography>{company.address.address2}</Typography>
          <Typography variant="subtitle1">
            {Formatters.Address.region(company.address)}
          </Typography>
        </TextWithIcon>
      </CardContent>
      <CardActions>
        <Button
          disabled={editCompanyStatus.isLoading}
          startIcon={
            editCompanyStatus.isLoading ? (
              <CircularProgress size={24} />
            ) : company.starred ? (
              <Star />
            ) : (
              <StarOutline />
            )
          }
          onClick={handleStar}
        >
          Starred
        </Button>
      </CardActions>
    </Card>
  );
};

export default CompanyItem;
