import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Profile = () => {

  const {profileId} = useParams()
  const [user, setUser] = useState(null)
  const [posts, setsPosts] = useState([])
  const [activeTab, setActtiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState('false')

  const fetchUser = async ()=>{
    setUser(dummyUserData)
    setsPosts(dummyPostsData)
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return user ?(
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Cover Photo */}
          
        </div>
      </div>

    </div>
  ) : (<Loading/>)
}

export default Profile