import axios from 'axios'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../../utils/loading/Loading'
import Spinner from '../../utils/loading/Spinner'

const Protect = () => {
     const isLoggedIn = useSelector(state => state.authInfo.isLoggedIn)
     const isLoading = useSelector(state => state.authInfo.loading)
      
     if(isLoading){
          return <> <div className="loading-spinner"
            style={{minHeight : '100vh',width: '100%'}}><Spinner />
          </div>  </>
     }
     return (isLoggedIn ? <Outlet /> : <Navigate to='/login' />)
}

export default Protect
