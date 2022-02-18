import React from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import EventsSlider from "./EventsSlider";
import Calendar from "./Calendar";

export default function Location({ locations }) {
  let { id } = useParams();
  const [locationEvents, setLocationEvents] = React.useState([]);
  const [fromDate, setFromDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const locationInfo = locations.filter((loc) => loc.id === id)[0];

  React.useEffect(() => {
    setFromDate();
    setEndDate();
    setLocationEvents("loading");
    axios
      .get(`https://gw.selinatech.com/events/events/aggregated/${id}`)
      .then((response) => {
        const { data } = response;
        console.log("locationEvents =====>", data);
        setLocationEvents(data);
      });
  }, [id]);

  return (
    <article>
      {locationInfo && (
        <div className="locationInfoWrapper">
          <div className="locationInfo">
            <div className="subHeader">Location Info</div>
            <div>Location: {locationInfo.name}</div>
            <div>Country: {locationInfo.enData.country}</div>
            <div>Region: {locationInfo.enData.region}</div>
            <div>Check In: {locationInfo.checkInTime}</div>
            <div>Check Out: {locationInfo.checkOutTime}</div>
            <div>Timezone: {locationInfo.timezone}</div>
            <div>
              CC Accepted:{" "}
              {locationInfo.acceptedCreditCardBrands.map((card) => (
                <>{card} </>
              ))}
            </div>
            <div>
              Coords: [{locationInfo.coordinate.lat},{" "}
              {locationInfo.coordinate.lng}, ]
            </div>
          </div>

          <Calendar
            fromDate={fromDate}
            setFromDate={setFromDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
      )}

      {locationEvents === "loading" ? (
        <div className="sliderAlert">Loading...</div>
      ) : locationEvents.length === 0 ? (
        <div className="sliderAlert">Sorry, No Events</div>
      ) : (
        <div>
          <EventsSlider
            locationEvents={locationEvents.filter((event) => {
              let show = false;
              if (fromDate && endDate) {
                if (
                  fromDate <= new Date(event.startDateISO8601) &&
                  new Date(event.endDateISO8601) <= endDate
                ) {
                  show = true;
                }
              } else {
                show = true;
              }
              return show;
            })}
          />
        </div>
      )}
    </article>
  );
} //<EventsSlider locationEvents={locationEvents} />
