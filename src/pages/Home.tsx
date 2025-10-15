import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventSection from "../components/Layouts/Client/EventSection";
import CarouselItem from "../components/Layouts/Client/CarouselItem";

const Home = () => {
  return (
    <div className="py-8 w-full mx-auto bg-[#27272A]">
      <div className="mx-40">
        {/*   CAROUSEL SECTION*/}
        <div className="mx-auto mb-8">
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            keyBoardControl={true}
            customTransition="transform 500ms"
            transitionDuration={500}
            containerClass="flex carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            partialVisible={false}
          >
            {events.map((event) => {
              return <CarouselItem key={event.event_id} data={event} />;
            })}
          </Carousel>
        </div>

        {/* UPCOMING SECTION */}
        <EventSection title="Sắp diễn ra" data={events} />

        {/* FOR YOU SECTION */}
        <EventSection title="Dành cho bạn" data={events.slice(2, 8)} />

        {/* ANOTHER SECTION */}
        <EventSection title="Sự kiện nổi bật" data={events.slice(8, 10)} />
      </div>
    </div>
  );
};

export default Home;
