import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from '../pages/adminPage/AdminLogin';

const AdminRoute: React.FC = ()=>{
    return(
     <Router>
        <Routes>
        <Route path="/admin" element={<AdminLogin />} />

        </Routes>
     </Router>
    )
}

export default AdminLogin