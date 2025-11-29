import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar/Topbar'

export default function DashboardLayout() {
  return (
        <div className='d-flex'>
            <Sidebar/>
            <div className='flex-grow-1 d-flex flex-column min-vh-100 bg-light'>
                <Topbar/>
                <main className='flex-grpw-1 p-4 bg-light'>
                    {/** ACA VAN TODOS MIS ELEMENTOS DEL DASHBOARD*/}
                    <Outlet/>
                </main>
            </div>
        </div>
    );
  }
