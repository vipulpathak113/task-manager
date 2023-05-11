import { CssBaseline, ThemeProvider } from '@mui/material';
import { FC, ReactElement } from 'react';

import { Dashboard } from './pages/Dashboard/dashboard'
import { customTheme } from './theme/customTheme';

const App: FC = (): ReactElement => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
