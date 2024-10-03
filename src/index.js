import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
// import Starring from './Starrating';

// const Test =()=> {
//   const [movieRating, setmovieRating]=useState(0)
//   return (
//     <div>
//     <Starring color="blue" maxRating={10} onsetRating={setmovieRating}/>
//     <p>this movie was rated {movieRating} star</p>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Starring  maxRating={5} message={['terrible', 'bad', 'good', 'amazing']}/>
     <Starring  color='red' size={24} className='test' defaultRating={3}/>
     <Test /> */}
  </React.StrictMode>
);

