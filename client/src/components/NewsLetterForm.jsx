import React from 'react'

const NewsLetterForm = () => {
  return (
    <div className=' flex flex-col items-center justify-center my-5 w-full border-t'>
        <div className='text-center my-5'>
            <h1 className=' font-Montserrat uppercase font-black text-2xl'>Sign Up For Newsletters</h1>
            <p className=' text-gray-600 font-YsabeauInfant my-1'>Stay informed with the latest updates and exclusive offers by signing up for our newsletters today!</p>
        </div>
            <form className=' flex items-center gap-2 w-full justify-center lg:flex-row flex-col mb-5'>
                <div className=' w-1/2 rounded-full overflow-hidden h-10 border-2 '>
                    <input type="email" placeholder='Your email address' className=' w-full h-full outline-none bg-transparent indent-2 px-1' />
                </div>
                <div className='w-fit grid place-items-center rounded-full overflow-hidden'>
                    <button className=' h-full w-full py-3 px-8 bg-black text-ebony-50 uppercase font-mono text-xs font-semibold'>Subscribe</button>
                </div>
            </form>
    </div>
  )
}

export default NewsLetterForm