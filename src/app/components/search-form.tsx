import {
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Popover,
  Rating,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { t } from '@/utils/i18n';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGenresQuery } from '@/graphql/queries/genres.generated';
import { SEARCH_DEBOUNCE } from '@/consts';

export type SearchModel = {
  title: string;
  genre: string[];
  releaseDateStart: moment.Moment;
  releaseDateEnd: moment.Moment;
  rating: number;
};

export type SearchFormProps = {
  onChanged: (values: SearchModel) => void;
  loading?: boolean;
};

export const initialValues: SearchModel = {
  title: '',
  genre: [],
  releaseDateStart: moment('1950-01-01'),
  releaseDateEnd: moment(),
  rating: 0,
};

export const SearchForm = (props: SearchFormProps) => {
  const { onChanged: onSubmit, loading } = props;

  const genrePopupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  });

  const { data, loading: loadingGenres, error } = useGenresQuery();

  const debouncedSearch = useRef(
    debounce(() => {
      void formik.submitForm();
    }, SEARCH_DEBOUNCE),
  );

  const formik = useFormik<SearchModel>({
    initialValues,
    onSubmit,
  });

  const handleChange = useCallback(
    (field: string, value: unknown) => {
      formik.setFieldValue(field, value);
      debouncedSearch.current();
    },
    [formik],
  );

  const resetForm = useCallback(() => {
    formik.resetForm();
    debouncedSearch.current();
  }, [formik]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      debouncedSearch.current.cancel();
    };
  }, []);

  const genresAvailable = useMemo(
    () => !loadingGenres && !error && !!data?.genres.length,
    [loadingGenres, error, data],
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={sx.header}>
          <Typography variant="h6" component="div" sx={sx.headerTitle}>
            {t`Search`}
          </Typography>
          <Box>
            <Button
              disabled={!formik.dirty || loading}
              size="small"
              variant="text"
              onClick={resetForm}
            >
              {t`Reset`}
            </Button>
          </Box>
        </Box>
        <Box sx={sx.titleGenre}>
          <Box gap={2} sx={sx.title}>
            <Box flex={1}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                autoComplete="off"
                size="small"
                role="search"
                autoFocus
                value={formik.values.title}
                onChange={(event) =>
                  handleChange('title', event.currentTarget.value)
                }
              />
            </Box>
            <Box sx={sx.genre}>
              <Button
                sx={sx.genreActivator}
                {...bindTrigger(genrePopupState)}
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                size="medium"
                disabled={!genresAvailable}
              >
                Genre
              </Button>
              {!!data?.genres.length && (
                <Popover
                  {...bindMenu(genrePopupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  disableEnforceFocus
                  disablePortal
                >
                  <FormGroup sx={sx.genrePopover}>
                    {data.genres.map(({ id, title }) => (
                      <FormControlLabel
                        key={id}
                        control={<Checkbox />}
                        label={title}
                        value={id}
                        checked={formik.values.genre.includes(id)}
                        onChange={(_, checked) => {
                          handleChange(
                            'genre',
                            checked
                              ? [...new Set([...formik.values.genre, id])]
                              : formik.values.genre.filter(
                                  (theId) => theId !== id,
                                ),
                          );
                        }}
                      />
                    ))}
                  </FormGroup>
                </Popover>
              )}
            </Box>
          </Box>
          <Box gap={2} sx={sx.dateRating}>
            <Box flex={1}>
              <Typography sx={sx.dateTitle} variant="subtitle1" component="div">
                {t`Release date`}
              </Typography>
              <Box flex={1}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <SingleInputDateRangeField
                    size="small"
                    format="DD/MM/YYYY"
                    fullWidth
                    defaultValue={[
                      formik.values.releaseDateStart,
                      formik.values.releaseDateEnd,
                    ]}
                    onChange={(newValue) => {
                      const [releaseDateStart, releaseDateEnd] = newValue;

                      handleChange('releaseDateStart', releaseDateStart);
                      handleChange('releaseDateEnd', releaseDateEnd);
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={sx.rating}>
              <Box sx={sx.ratingTitle}>
                <Typography variant="subtitle1" component="div">
                  {t`Rating`}
                </Typography>
              </Box>
              <Box sx={sx.ratingControl}>
                <Rating
                  name="simple-controlled"
                  value={+formik.values.rating}
                  onChange={(_, newValue) => {
                    handleChange('rating', newValue || 0);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const sx = {
  header: { display: 'flex', alignItems: 'center', mb: 1, gap: 2 },
  headerTitle: { mb: 0.4 },
  titleGenre: { gap: 2, display: 'flex', flexDirection: 'column' },
  title: { display: 'flex', flexDirection: { xs: 'column', sm: 'row' } },
  genre: { display: { xs: 'block', sm: 'flex' }, minWidth: 120 },
  genreActivator: { flex: 1 },
  genrePopover: { p: 2 },
  dateRating: { display: 'flex', flexDirection: { xs: 'column', sm: 'row' } },
  dateTitle: { display: { xs: 'none', sm: 'block' } },
  rating: { minWidth: 120 },
  ratingTitle: { display: { xs: 'none', sm: 'block' } },
  ratingControl: {
    height: { xs: 'inherit', sm: 40 },
    display: 'flex',
    alignItems: 'center',
  },
};
