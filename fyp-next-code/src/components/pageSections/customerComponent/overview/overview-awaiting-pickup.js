import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";
import {useEffect, useState} from "react";
import {getAllCustomerPersonalParcelsData} from "@/api/springboot-api";

export const OverviewAwaitingPickup = (props) => {
  const { difference, positive = false, sx} = props;
  const auth = useAuthContext();
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchJsonData = async () => {
      const result = await getAllCustomerPersonalParcelsData(auth.user.customerId);
      setValue(() => result.data.length);
    };

    fetchJsonData();
  }, [auth.user.customerId]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              No. of parcels awaiting pickup
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <WarehouseIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewAwaitingPickup.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

