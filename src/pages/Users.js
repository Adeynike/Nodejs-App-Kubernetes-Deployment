
import React, { useEffect, useState } from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import { Button, Table, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setSelectedUserId, clearSelectedUserId } from '../store/slice';

const queryClient = new QueryClient();

function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleUserClick = (userId) => {
    dispatch(setSelectedUserId(userId));
    localStorage.setItem('selectedUserId', userId);
  };

  const fetchData = () => {
    setIsLoading(true);
    fetch(`https://randomuser.me/api/?results=50`)
      .then((response) => response.json())
      .then((data) => {
        let userData = data.results;
        setUsers(userData);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUserId());
    };
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='table-container'>
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">please wait...</span>
          </div>
        </div>
      ) : (
        <div className="pt-4">
          <div className="text-center">
            <h2 className="ProjectTitle">Random User Task</h2>
          </div>

        <Table striped bordered hover responsive className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((data) => (
              <tr key={data.login.uuid}>
                <td>
                  <Link
                    to={`/user/${data.login.uuid}`}
                    onClick={() => handleUserClick(data.login.uuid)}
                  >
                    {`${data.name.first} ${data.name.last}`}
                  </Link>
                </td>
                <td>{`${data.location.country}`}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
            <div className="pagination-container">
                <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Users per Page: {usersPerPage}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setUsersPerPage(5)}>5</Dropdown.Item>
                    <Dropdown.Item onClick={() => setUsersPerPage(10)}>10</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>

                <Button
                className="pagination-btn btn btn-sm mx-2"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                >
                Previous
                </Button>

                <Button
                className="pagination-btn btn btn-sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastUser >= users.length}
                >
                Next
                </Button>
            </div>
        </div>
        </div>
        )}
    </div>
    </QueryClientProvider>
  );
}

export default Users;
