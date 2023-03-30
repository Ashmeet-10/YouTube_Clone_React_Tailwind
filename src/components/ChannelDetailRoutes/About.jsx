import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import Loading from '../Loading'

const About = () => {
  const { id } = useParams()
  const [about, setAbout] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      const data = await fetchFromAPI(`channel/about?id=${id}`)
      setAbout(data)
      console.log(data)
      setIsLoading(()=>false)
    })()
  }, [id])

  if(isLoading){
    return (<Loading classes="items-start"/>)
  }

  return (
    <div className='mt-4 px-4 pb-4'>
      About
      <pre className='font-sans whitespace-pre-line text-sm font-normal leading-1 mt-4'>{about.description}</pre>

      <div className="flex flex-col space-y-2 py-4">
        {about.links && about?.links.map((link, idx) => (
          <Link key={idx} to={link.link} className="text-sky-500">{link.title}</Link>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <span className='text-sm font-normal'>Joined {about.joinedDate}</span>
        <span className='text-sm font-normal'>{about.viewCount} views</span>
      </div>
    </div>
  )
}

export default About
