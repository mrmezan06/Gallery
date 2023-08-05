import {
  Box,
  Badge,
  Container,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FcStackOfPhotos } from 'react-icons/fc';

import Spinner from '../../../components/Spinner';
import StyledDivider from '../../../components/StyledDivider';
import StyledTableCell from '../../../components/StyledTableCell';
import StyledTableRow from '../../../components/StyledTableRow';

import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

import { useGetAllCategoryByItsUserQuery } from '../../../slice/api/categoryApiSlice';
import { useNavigate } from 'react-router-dom';
import { useGetAllPhotosByItsUserQuery } from '../../../slice/api/photoApiSlice';

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pagePhoto, setPagePhoto] = useState(0);
  const [rowsPerPagePhoto, setRowsPerPagePhoto] = useState(5);

  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllCategoryByItsUserQuery('allCategoryListUser', {
      pollingInterval: 600000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const {
    data: dataPhoto,
    isLoading: isLoadingPhoto,
    isSuccess: isSuccessPhoto,
  } = useGetAllPhotosByItsUserQuery('allPhotoListUser', {
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const photoRows = dataPhoto?.photos;
  const emptyPhotoRows =
    pagePhoto > 0
      ? Math.max(0, (1 + pagePhoto) * rowsPerPagePhoto - photoRows?.length)
      : 0;

  const handleChangePagePhoto = (event, newPage) => {
    setPagePhoto(newPage);
  };

  const handleChangeRowsPerPagePhoto = (event) => {
    setRowsPerPagePhoto(parseInt(event.target.value, 10));
    setPagePhoto(0);
  };

  const rows = data?.categories;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteHandler = async (id) => {};

  useEffect(() => {
    if (isError) {
      const message = error.data.message;
      toast.error(message);
    }
  }, [error, isError]);

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <CssBaseline />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BiCategory fontSize="32" color="white" />
          <Typography
            variant="h1"
            sx={{ fontSize: '28px', color: 'white', fontWeight: 600 }}
          >
            Category
          </Typography>
        </Box>
        <StyledDivider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: 'white',
            }}
          >
            <Typography variant="h4"> Total: </Typography>
            <Badge
              badgeContent={data?.count}
              color="primary"
              sx={{ marginTop: '3px', marginLeft: '5px' }}
            >
              <BiCategory color="white" fontSize="36" />
            </Badge>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              ':hover': {
                color: '#c0dcf1',
              },
            }}
            onClick={() => navigate('/category/add')}
          >
            <Typography variant="h4"> Add </Typography>
            <AiOutlineFileAdd color="white" fontSize="36" />
          </Box>
        </Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Preview</StyledTableCell>
                  <StyledTableCell align="right">Date of birth</StyledTableCell>
                  <StyledTableCell align="right">Country</StyledTableCell>
                  <StyledTableCell align="right">CreatedAt</StyledTableCell>
                  <StyledTableCell align="right">UpdatedAt</StyledTableCell>
                  <StyledTableCell align="right">Update</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isSuccess && (
                  <>
                    {(rowsPerPage > 0
                      ? rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row, index) => (
                      <StyledTableRow
                        key={row._id}
                        sx={{
                          '&:last-chid td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.categoryName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <img
                            src={row.posterPhotoURL}
                            alt={row.category}
                            style={{
                              height: '32px',
                              width: '50px',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              fit: 'cover',
                            }}
                            onClick={() =>
                              navigate(`/gallery?id=${row._id}`, {
                                replace: true,
                              })
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.dateOfBirth}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.country}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {moment(row?.createdAt).format('DD-MM-YYYY')}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {moment(row?.updatedAt).format('DD-MM-YYYY')}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box>
                            <EditIcon
                              color="success"
                              fontSize="medium"
                              sx={{
                                cursor: 'pointer',
                              }}
                              onClick={() => deleteHandler(row._id)}
                            />
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Box>
                            <ClearIcon
                              color="error"
                              fontSize="medium"
                              sx={{
                                cursor: 'pointer',
                              }}
                              onClick={() => deleteHandler(row._id)}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                )}
                {/* control how emptyRows are displayed */}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {/* footer with pagination */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={9}
                    count={rows?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Container component="main" maxWidth="lg" sx={{ mb: 10 }}>
        <CssBaseline />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FcStackOfPhotos fontSize="32" color="white" />
          <Typography
            variant="h1"
            sx={{ fontSize: '28px', color: 'white', fontWeight: 600 }}
          >
            Photos
          </Typography>
        </Box>
        <StyledDivider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: 'white',
            }}
          >
            <Typography variant="h4"> Total: </Typography>
            <Badge
              badgeContent={dataPhoto?.count}
              color="primary"
              sx={{ marginTop: '3px', marginLeft: '5px' }}
            >
              <FcStackOfPhotos fontSize="36" />
            </Badge>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              ':hover': {
                color: '#c0dcf1',
              },
            }}
            onClick={() => navigate('/photo/add')}
          >
            <Typography variant="h4"> Add </Typography>
            <AiOutlineFileAdd color="white" fontSize="36" />
          </Box>
        </Box>
        {isLoadingPhoto ? (
          <Spinner />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Model Name</StyledTableCell>
                  <StyledTableCell align="right">Preview</StyledTableCell>
                  <StyledTableCell align="right">Place</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isSuccessPhoto && (
                  <>
                    {(rowsPerPagePhoto > 0
                      ? photoRows.slice(
                          pagePhoto * rowsPerPagePhoto,
                          pagePhoto * rowsPerPagePhoto + rowsPerPagePhoto
                        )
                      : photoRows
                    ).map((row, index) => (
                      <StyledTableRow
                        key={row._id}
                        sx={{
                          '&:last-chid td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.name.length > 70
                            ? row.name.slice(0, 70)
                            : row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.categoryId?.categoryName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <img
                            src={row.url}
                            alt={row.name}
                            style={{
                              height: '32px',
                              width: '50px',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              fit: 'cover',
                            }}
                            onClick={() =>
                              navigate(`/photo?id=${row._id}`, {
                                replace: true,
                              })
                            }
                          />
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          {row.place}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Box>
                            <ClearIcon
                              color="error"
                              fontSize="medium"
                              sx={{
                                cursor: 'pointer',
                              }}
                              onClick={() => deleteHandler(photoRows._id)}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </>
                )}
                {/* control how emptyRows are displayed */}
                {emptyPhotoRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {/* footer with pagination */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={9}
                    count={photoRows?.length || 0}
                    rowsPerPage={rowsPerPagePhoto}
                    page={pagePhoto}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePagePhoto}
                    onRowsPerPageChange={handleChangeRowsPerPagePhoto}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
