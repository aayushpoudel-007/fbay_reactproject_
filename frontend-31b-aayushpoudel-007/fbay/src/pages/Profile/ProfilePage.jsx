import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setUser(parsedUser);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {user ? (
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%' }}>
          <tbody>
            <tr>
              <td style={cellStyle}><strong>First Name:</strong></td>
              <td style={cellStyle}>{user.firstName}</td>
            </tr>
            <tr>
              <td style={cellStyle}><strong>Last Name:</strong></td>
              <td style={cellStyle}>{user.lastName}</td>
            </tr>
            <tr>
              <td style={cellStyle}><strong>Email:</strong></td>
              <td style={cellStyle}>{user.email}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default ProfilePage;
