import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventCard from "../components/EventCard";

const Home = () => {
  return (
    <div className="py-8 w-full mx-auto bg-[#212121]">
      <div className=" mx-30">
        {/* UPCOMING EVENTS */}
        <div className=" mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Sắp diễn ra</h2>
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
            {events.map((event) => (
              <EventCard
                key={event.event_id}
                banner_url={event.banner_url}
                title={event.title}
                date={event.start_date}
                location={event.location}
              />
            ))}
          </Carousel>
        </div>
        {/* FOR YOU */}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
