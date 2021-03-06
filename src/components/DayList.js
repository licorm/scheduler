import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const list = props.days.map((obj) => {
    return (
      <DayListItem
        key={obj.id}
        name={obj.name}
        spots={obj.spots}
        selected={obj.name === props.day}
        setDay={props.setDay}
      />
    )
  })
  return (<ul>{list}</ul>);
};