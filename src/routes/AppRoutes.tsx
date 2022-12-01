import { AppLayout } from 'components/AppLayout';
import { Home, NotFound } from 'pages';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
