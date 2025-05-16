import React from 'react'
import Companies from '../../components/students/companies'
import CoursesSection from '../../components/students/CoursesSection'
import TestimonialsSection from '../../components/students/TestimonialsSection'
import CalltoAction from '../../components/students/CalltoAction'
import Footer from '../../components/students/Footer'
import Hero from '../../components/students/Hero'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero />
        <Companies />
        <CoursesSection />
        <TestimonialsSection />
        <CalltoAction />
        <Footer />
    </div>
  )
}

export default Home