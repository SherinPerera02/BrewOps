import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import React from 'react';


const BackButton = ({ destination = '/inventories' }) => {
  return (
    <div className='flex mt-8'>
      <Link to={destination} className='bg-blue-400 text-white px-2 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;

