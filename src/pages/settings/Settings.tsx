import React from 'react'
import SideNav from '../../components/Navigation/Sidenav'
import ProfileView from '../../components/ProfileView/ProfileView'
import Menubar from '../../components/menubar/Menubar'

const Settings = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="bg-purple-50 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 col-span-12 md:col-span-9">
          <div className="grid grid-cols-12">
            <div className="bg-white col-span-12 md:col-span-1">
            <div className="hidden md:block">
              <SideNav  />

              </div>
          <div className="md:hidden">
          <Menubar/>

          </div>
            </div>
            <div className="col-span-12 md:col-span-11  grid place-content-center h-screen ">
           <h1 className='font-bold'>settings</h1>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <ProfileView />
        </div>
      </div>
    </div>
  )
}

export default Settings