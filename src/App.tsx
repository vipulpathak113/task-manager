import { CssBaseline, ThemeProvider } from '@mui/material';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Dashboard } from './pages/Dashboard/dashboard';
import { customTheme } from './theme/customTheme';
import { ReactQueryDevtools } from 'react-query/devtools';
import ComposeContext from './context/Compose.context';
import { rootContext } from './context/root.context';

const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
      </ComposeContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
