import {Link} from 'react-router-dom'

const LogoutBtn = () => {
  return (
    <Link to='/login' className='green-btn w-full px-4 bg-gray-400 hover:bg-green-500 text-center'>
      Logout
    </Link>
  );
}

export default LogoutBtn