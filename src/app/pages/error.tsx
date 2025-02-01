import { Card, CardContent, Typography } from '@mui/material';
import { t } from '@/utils/i18n';

export const Error = () => (
  <Card>
    <CardContent sx={sx.contentPadding}>
      <Typography variant="body1">{t`Page not found`}</Typography>
    </CardContent>
  </Card>
);

const sx = {
  contentPadding: { pt: 3 },
};
