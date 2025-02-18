import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./index.css"; // Ensure CSS is properly linked

function CarousaL() {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const carouselItems = [
    {
      title: "Biryani",
      description: "Treat your taste buds to a journey with Biryani, a fragrant rice dish bursting with flavor.",
      className: "Item1"
    },
    {
      title: "Veg Samosa",
      description: "Looking for a delicious and satisfying snack? Try Veg Samosa! These crispy fried pockets are filled with a savory blend of vegetables and spices.",
      className: "Item2"
    },
    {
      title: "Butter Chicken",
      description: "Butter Chicken is your ticket to flavor paradise! Tender, marinated chicken in a creamy tomato sauce, bursting with warm spices.",
      className: "Item3"
    }
  ];

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      showDots={true}
      ssr={true} // Server-side rendering
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000} // Increased for better readability
      keyBoardControl={true}
      customTransition="transform 0.6s ease-in-out"
      transitionDuration={600}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {carouselItems.map((item, index) => (
        <div key={index} className={`carousel-item ${item.className}`}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default CarousaL;
