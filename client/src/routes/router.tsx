import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RequireAuth } from '~/components/RequireAuth/RequireAuth';
import { AuthRedirect } from '~/pages/AuthRedirect/AuthRedirect';
import { Configuration } from '~/pages/Configuration/Configuration';
import { ErrorPage } from '~/pages/Error/ErrorPage';
import { Leaderboard } from '~/pages/Leaderboard';
import { LogIn } from '~/pages/LogIn';
import { Main } from '~/pages/Main/Main';

import { Paths } from './paths';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.AuthRedirect} element={<AuthRedirect />} />
        <Route path={Paths.Login} element={<LogIn />} />

        <Route element={<RequireAuth />}>
          <Route path={Paths.Configuration} element={<Configuration />} />
          <Route path={Paths.Home} element={<Main />} />
          <Route path={Paths.Leadearboard} element={<Leaderboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
