import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {createClient} from '@supabase/supabase-js'
import {SessionContextProvider} from '@supabase/auth-helpers-react';
const supabase=createClient("https://gzjqjvybayzezmrhcoio.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6anFqdnliYXl6ZXptcmhjb2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjYwMzYsImV4cCI6MjA1NTAwMjAzNn0.ZFKDMBlUkSBG0vIBUsAWtz34jyY1sKNE6cyCvyO74ZA")
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionContextProvider supabaseClient={supabase} >
      <App />
      </SessionContextProvider>
    </PersistGate>
  </Provider>
);