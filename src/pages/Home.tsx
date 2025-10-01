// import { useState } from "react";
import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventCard from "../components/EventCard";
import { getDisplayPrice } from "../components/utils/getDisplayPrice";
import EventSection from "../components/EventSection";

const Home = () => {
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
        <EventSection title="Sắp diễn ra" data={events.slice(0, 4)} />

        {/* FOR YOU SECTION */}
        <EventSection title="Dành cho bạn" data={events.slice(4, 8)} />

        {/* ANOTHER SECTION */}
        <EventSection title="Sự kiện nổi bật" data={events.slice(0, 8)} />
      </div>
    </div>
  );
};

export default Home;
