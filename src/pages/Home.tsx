import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventCard from "../components/EventCard";

const Home = () => {
  return (
    <div className="py-8">
      {/* UPCOMING EVENTS */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sắp diễn ra</h2>
        <Carousel
          swipeable
          draggable
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="transform 500ms ease"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="px-2" // <-- giảm padding giữa các item
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
    </div>
  );
};

export default Home;
