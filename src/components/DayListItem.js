import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  //set the different classnames
  const dayListClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  //format the spots to render different messages depending on plural/empty
  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining';
    }
    if (props.spots === 1) {
      return '1 spot remaining';
    }
    return `${props.spots} spots remaining`;
  }


  return (
    <li onClick={() => props.setDay(props.name)} className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}