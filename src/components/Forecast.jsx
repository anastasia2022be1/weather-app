import React from 'react'

const Forecast = () => {
    const data = [1, 2, 3, 4, 5]
  return (
    <div>
        <div className="flex items-center justify-start mt-6 text-white">
            <p className="font-medium uppercase">3 hour step forecast</p>
        </div>
        <hr  className='my-1'/>
        <div className='flex items-center justify-between mt-2 text-white'>
            {data.map((data, index) => (
                <div key={index} className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm'>Wed</p>
                    <img src='https://www.weatherbit.io/static/img/icons/c02d.png' alt='weather icon' className='w-12 h-12'/>
                    <p className='font-medium'>20°C</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast