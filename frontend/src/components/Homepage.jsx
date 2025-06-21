import React from 'react'
import MessageContainor from './MessageContainor.jsx'
import Sidebar from './Sidebar.jsx'

function Homepage() {
  return (
    <div className='min-h-screen w-full bg-cover bg-center flex items-center justify-center'>
      <div className='flex h-[90vh] w-[90%] rounded-xl overflow-hidden bg-white/10 backdrop-blur-lg shadow-xl border border-white/20'>

        {/* Sidebar */}
        <Sidebar />
        {/* Message Container */}
        <MessageContainor />
      
      </div>
    </div>
  )
}

export default Homepage
