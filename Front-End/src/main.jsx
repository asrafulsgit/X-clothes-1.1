import { createRoot } from 'react-dom/client'
import {Provider, useSelector} from 'react-redux'

import App from './App.jsx'
import './index.css'
import userInfoStore from './utils/Controllers/UserInfoStore.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={userInfoStore}>
     <App />
  </Provider>,
)
