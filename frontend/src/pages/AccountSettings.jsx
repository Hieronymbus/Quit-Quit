import React from 'react'
import Header from '../components/Header'

const AccountSettings = () => {
 
    return (
        <div
            className='w-full h-screen flex flex-col '
        >
            <Header />
            <div
                className='h-full-minus-16 p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200'
            >
                sup yall this is where you will be able to change your username, reset password, delete account... coming soon
            </div>
        </div>
  )
}

export default AccountSettings