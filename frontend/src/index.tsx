import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from "react-query";
import "../node_modules/antd/dist/antd.min.css"

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>,
  document.getElementById('root')
);
