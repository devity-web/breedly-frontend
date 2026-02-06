export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://breedly-backend.vercel.app/api';
  }

  return 'http://localhost:3000/api';
};
