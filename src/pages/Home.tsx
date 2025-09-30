// import { useState } from "react";

import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const Home = () => {
  // function lay gia ve re nhat
  const getDisplayPrice = (tickets: { price: number }[]) => {
    if (!tickets || tickets.length === 0) return null;
    return Math.min(...tickets.map((t) => t.price));
  };

  return (
    <div className="py-8 w-full mx-auto bg-[#212121]">
      <div className="mx-30">
        {/* SPECIAL SECTION*/}
        <div className="mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Sự kiện đặc biệt
          </h2>
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="transform 500ms ease"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="mx-2"
            partialVisible={false}
          >
            {events.map((event) => {
              return (
                <EventCard
                  event_id={event.event_id}
                  key={event.event_id}
                  banner_url={event.banner_url}
                  title={event.title}
                  date={event.start_date}
                  location={event.location}
                  price={getDisplayPrice(event.tickets)}
                />
              );
            })}
          </Carousel>
        </div>
        {/* UPCOMING SECTION */}
        <div className="mt-6 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-bold mb-6">
              Sắp diễn ra
            </div>
            <Link to="/all-events" className="text-white hover:text-[#2dc275]">
              Xem thêm
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => {
              return (
                <EventCard
                  event_id={event.event_id}
                  key={event.event_id}
                  banner_url={event.banner_url}
                  title={event.title}
                  date={event.start_date}
                  location={event.location}
                  price={getDisplayPrice(event.tickets)}
                />
              );
            })}
          </div>
        </div>
        {/* FOR YOU SECTION */}
        <div className="mt-6 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-bold mb-6">
              Dành cho bạn
            </div>
            <Link to="/all-events" className="text-white hover:text-[#2dc275]">
              Xem thêm
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => {
              return (
                <EventCard
                  event_id={event.event_id}
                  key={event.event_id}
                  banner_url={event.banner_url}
                  title={event.title}
                  date={event.start_date}
                  location={event.location}
                  price={getDisplayPrice(event.tickets)}
                />
              );
            })}
          </div>
        </div>
        {/* FOR YOU SECTION */}
        <div className="mt-6 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-bold mb-6">
              Dành cho bạn
            </div>
            <Link to="/all-events" className="text-white hover:text-[#2dc275]">
              Xem thêm
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => {
              return (
                <EventCard
                  event_id={event.event_id}
                  key={event.event_id}
                  banner_url={event.banner_url}
                  title={event.title}
                  date={event.start_date}
                  location={event.location}
                  price={getDisplayPrice(event.tickets)}
                />
              );
            })}
          </div>
        </div>
        {/* FOR YOU SECTION */}
        <div className="mt-6 ">
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-bold mb-6">
              Dành cho bạn
            </div>
            <Link to="/all-events" className="text-white hover:text-[#2dc275]">
              Xem thêm
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => {
              return (
                <EventCard
                  event_id={event.event_id}
                  key={event.event_id}
                  banner_url={event.banner_url}
                  title={event.title}
                  date={event.start_date}
                  location={event.location}
                  price={getDisplayPrice(event.tickets)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
