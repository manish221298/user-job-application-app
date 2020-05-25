import   React from 'react'
//import {BrowserRouter, Route, Link } from 'react-router-dom'
import UserForm from './components/UserForm'
import AdminDashboard from './components/AdminDashboard'

function App() {
    return(
        // <BrowserRouter>
        // <div>
        //     {/* <Link to="/">UserForm</Link> - */}
        //     <Link to="/AdminDashboard">AdminDashboard</Link> 

        //     <Route path="/" component={UserForm} exact={true} />
        //     <Route path="/admindashboard" component={AdminDashboard} />
        // </div>
        // </BrowserRouter>
        <div>
            <UserForm />
            <AdminDashboard />
        </div>
    )
}
export default App