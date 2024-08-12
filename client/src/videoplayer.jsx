import React from 'react';
import ReactPlayer from 'react-player';
import video from './video/video.mkv';
import { Link } from 'react-router-dom';

export const Videoplayer = () => {
  return (
    <div className='videobox d-flex flex-row justify-content-center align-items-center'>
        <div className='videoinner'>
        <div className='pb-3'>
        <Link to='/test' className='pb-3'><b>Back</b></Link>
        </div>
        <ReactPlayer url={video} controls={true}/>
        </div>
    </div>
  )
}
