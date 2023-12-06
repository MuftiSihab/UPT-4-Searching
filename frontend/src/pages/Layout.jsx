import React from 'react';
import NavbarApp from '../components/NavbarApp.jsx';
import Sidebar from '../components/Sidebar.jsx';

const Layout = ({children}) => {
  return (
    <div>
        <React.Fragment>
            <NavbarApp/>
            <div className="columns mt-6" style={{minHeight: "100vh"}}>
                <div className="column is-2">
                    <Sidebar/>
                </div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    </div>
  )
}

export default Layout;
