export default function EventsSlider({ locationEvents }) {
  return (
    <div className="sliderWrapper">
      <div className="slider">
        <div className="slides">
          {locationEvents.map((locEvent, index) => {
            return (
              <div id={`slide-${index}`}>
                <img src={locEvent.images[0]} alt="" />
              </div>
            );
          })}
        </div>
        {locationEvents.map((locEvent, index) => {
          return <a href={`#slide-${index}`}>{index}</a>;
        })}
      </div>
    </div>
  );
}
