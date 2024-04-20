import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div>
      
      <div className="p-6">
        <h2 align="center" className='m-2 bg-gray-800 text-white p-4 text-2xl'>Upcoming Events</h2>
        <Slider {...settings}>
          <div className="p-4">
            <img src="./images/1.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/2.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/3.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/4.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/5.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/6.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/7.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/8.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          
          
        </Slider>
      </div>
    </div>
  );
};

export default Home;
