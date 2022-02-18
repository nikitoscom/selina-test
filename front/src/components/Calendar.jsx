import React from "react";
export default function Calendar({
  fromDate,
  setFromDate,
  endDate,
  setEndDate,
}) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const currDayOfWeek = now.getDay();
  const disabledDays = [...Array(currDayOfWeek).keys()]
    .map((day) => {
      return new Date(now.getTime() - (day + 1) * 24 * 60 * 60 * 1000);
    })
    .reverse();

  const daysArr = [...Array(35 - disabledDays.length).keys()].map((day) => {
    return new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
  });

  const [hovered, setHovered] = React.useState();

  return (
    <div
      className="calendarWrapper"
      onMouseLeave={() => {
        setHovered();
      }}
    >
      <div className="subHeader">The Events Calendar </div>
      <div className="calendar">
        <div className="day">Su</div>
        <div className="day">Mo</div>
        <div className="day">Tu</div>
        <div className="day">We</div>
        <div className="day">Th</div>
        <div className="day">Fr</div>
        <div className="day">Sa</div>
        {disabledDays.map((day) => (
          <div className="disabled day">{day.getDate()}</div>
        ))}
        {daysArr.map((day, index) => {
          let classNames = ["day"];
          if (fromDate && hovered && day >= fromDate && day <= hovered) {
            classNames.push("hovered");
          }

          if (fromDate && endDate && day >= fromDate && day <= endDate) {
            classNames.push("selected");
          }

          if (index === 0) classNames.push("currentDay");

          if (fromDate && fromDate.getTime() === day.getTime())
            classNames.push("fromDay");
          return (
            <div
              onClick={() => {
                if (fromDate) {
                  setEndDate(day);
                } else {
                  setFromDate(day);
                }
              }}
              onMouseEnter={() => {
                if (fromDate) setHovered(day);
              }}
              className={classNames.join(" ")}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
      <a
        href="#clear"
        className="clearRangeButton"
        onClick={() => {
          setFromDate();
          setEndDate();
        }}
      >
        Clear Range
      </a>
    </div>
  );
}
