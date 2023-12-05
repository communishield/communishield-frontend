import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './reset.css';
import './index.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
