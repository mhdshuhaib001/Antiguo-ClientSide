// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/Store';

// const UserProfile: React.FC = () => {
//   // Access user state from Redux store
//   const user = useSelector((state: RootState) => state.user.user);
//   const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

//   // Render different content based on authentication status
//   return (
//     <div>
//       {isAuthenticated ? (
//         <p>Welcome, {user && user.email ? user.email : 'User'}!</p>
//       ) : (
//         <p>Please log in.</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
