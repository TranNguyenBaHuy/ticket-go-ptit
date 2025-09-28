import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* BODY */}
      <div className="">
        {/* UPCOMING EVENTS */}
        <div className="">
          <div>Sắp diễn ra</div>
          {/* <div className="flex flex-row gap-3 overflow-x-auto scrollbar-hide"> */}
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {events.map((event) => (
              <div className="w-80 bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <div className="relative">
                  <img
                    src={event.banner_url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Home;
