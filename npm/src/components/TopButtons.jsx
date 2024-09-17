import React from 'react'

export default function TopButtons() {
  const cities = [
    {
      id:1,
      title: 'Berlin'
    },
    {
      id:1,
      title: 'London'
    },
    {
      id:1,
      title: 'Amsterdam'
    },
    {
      id:1,
      title: 'Paris'
    },
    {
      id:1,
      title: 'Wien'
    },
  ]
  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map((city) => (
        <button key={city.id} className='text-white text-lg font-medium'>{city.title}</button>
      ))}
    </div>
  )
}
