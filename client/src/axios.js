// // Example function for fetching users
// import axios from 'axios';

// const fetchUsers = async () => {
//   try {
//     // Retrieve token from localStorage or state
//     const token = localStorage.getItem('token'); 

//     // Set the token in the Authorization header
//     const response = await axios.get('http://localhost:3001/api/admin/users', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log('Users fetched successfully:', response.data);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };



import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

