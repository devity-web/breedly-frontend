export const getCallbackUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://breedly-frontend.vercel.app';
  }

  return 'http://localhost:5173';
};
