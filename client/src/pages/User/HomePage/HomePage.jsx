import React from 'react'
import ConnectComp from '../../../components/User/HomePage/ConnectCompany/ConnectComp'
import ContactForm from '../../../components/User/HomePage/ContactForm/ContactForm'
import Footer from '../../../components/User/HomePage/Footer/Footer'
import Navbar from '../../../components/User/HomePage/Navbar/Navbar'
import Search from '../../../components/User/HomePage/Search/Search'
import TravelPKG from '../../../components/User/HomePage/TravelPackeges/TravelPKG'
import TravelComp from '../../../components/User/HomePage/TravelSection/TravelComp'

const HomePage = () => {
  return (
    <div className='min-h-screen w-full'>
    <Navbar />
    <Search />
    <TravelComp />
    <TravelPKG />
    <ConnectComp />
    <ContactForm />
    <Footer />
    </div>
  )
}

export default HomePage