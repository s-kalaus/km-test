import { IconButton, ButtonGroup } from '@mui/material';

import { ArrowBack, ArrowForward } from '@mui/icons-material';

export type PaginationProps = {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  onBack: () => void;
  onNext: () => void;
};

export const Pagination = (props: PaginationProps) => {
  const { hasPreviousPage, hasNextPage, onNext, onBack } = props;

  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  return (
    <ButtonGroup sx={sx.frame}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        disabled={!hasPreviousPage}
        onClick={onBack}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        disabled={!hasNextPage}
        onClick={onNext}
      >
        <ArrowForward />
      </IconButton>
    </ButtonGroup>
  );
};

const sx = {
  frame: { gap: 2, display: 'flex', justifyContent: 'center' },
};
