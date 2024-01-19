
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { userId } = useParams();

  useEffect(() => {
    console.log('User ID from localStorage:', localStorage.getItem('selectedUserId'));
  }, [userId]);

  const { data: user } = useQuery(['user', userId], () =>
    fetch(`https://randomuser.me/api/?seed=${userId}`).then((res) => res.json())
  );

  return (
    <div className="user-details-container">
      {user && (
        <>
        <img  className="user-details-img" src={user.results[0].picture.large} alt="User" />
        <h2 className='user-details-header'>{`${user.results[0].name.first} ${user.results[0].name.last}`}</h2>
          <div className='.user-details-info user-details-label '>
            <p>City: {user.results[0].location.city}</p>
            <p>Date of Birth: {new Date(user.results[0].dob.date).toLocaleDateString()}</p>
            <p>Nationality: {user.results[0].nat}</p>
          </div>

        </>
      )}
    </div>
  );
}

export default UserDetails;
