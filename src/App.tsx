import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Banks } from './pages/banks/Banks';
import { BankDetail } from './pages/banks/BankDetail';
import { AccountDetail } from './pages/accounts/AccountDetail';
import { Validation } from './pages/validation/Validation';
import { Income } from './pages/income/Income';
import { Assets } from './pages/assets/Assets';
import { Investments } from './pages/investments/Investments';
import { Loans } from './pages/loans/Loans';
import { Reports } from './pages/reports/Reports';
import { Tax } from './pages/tax/Tax';
import { Charts } from './pages/charts/Charts';
import { Shopping } from './pages/shopping/Shopping';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { Box, CssBaseline } from '@mui/material';
import { client } from './lib/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          minWidth: '100vw',
          width: '100%',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <Navigation />
          <Box component="main" sx={{ 
            flexGrow: 1, 
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
            boxSizing: 'border-box'
          }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/banks" element={<Banks />} />
              <Route path="/banks/:bankId" element={<BankDetail />} />
              <Route path="/accounts/:accountId" element={<AccountDetail />} />
              <Route path="/validation" element={<Validation />} />
              <Route path="/income" element={<Income />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/taxes" element={<Tax />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
