import { createRoot } from 'react-dom/client'
import {Provider, useSelector} from 'react-redux'

import App from './App.jsx'
import './index.css'
import userInfoStore from './utils/Controllers/UserInfoStore.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Route.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={userInfoStore}>
     <RouterProvider router={Router} />
  </Provider>,
)
