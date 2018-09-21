import React from 'react';
import moment from 'moment';

export const localDateTimeMachine = (epoch) => {
  const myDate = new Date( epoch * 1000 );
  return myDate.toLocaleString()
}
// This function takes tideData which is an array of usually 7 objects. Each includes properties - dt(epoch time), type('High'/'Low') and height
export const tidesDisplay = (tideData, theme)=> {
      
      let currentDate = null;
      const groupedTides = [];
      for (let i = 0; i < tideData.length; i++) {
        const tide = tideData[i];
        const localDateTimeMachine = (epoch) => {
          const myDate = new Date( epoch * 1000 );
          return myDate.toLocaleString()
        }
        const thisDate =  moment(localDateTimeMachine(tide.dt).split(',')[0], 'MM DD YYYY').format('YYYY MM DD');
        if (currentDate === null || currentDate !== thisDate) {
          currentDate = thisDate;
          groupedTides.push([]);
        }
        groupedTides[groupedTides.length - 1].push(tide);
      } 
      return groupedTides.map((tidesArray, index) => {
        let daysCount = groupedTides.length + 1;
        let day;
        day = localDateTimeMachine(tidesArray[0].dt).split(',')[0];
        day = moment(day,'MM DD YYYY').format('dddd, MMMM Do');
        return (
          <div className={theme === 'night' ? `tide-display-night col-${daysCount}` : `tide-display-day col-${daysCount}`} key={index}>
            <h3 className='tide-results-date'>{day}</h3>
            <div>{tidesArray.map((tide, i) => {
              return <p key={i}><strong>{tide.type}</strong> Tide at {moment(localDateTimeMachine(tide.dt).split(',')[1], 'h:mm a').format('h:mm a')}</p>
            })
          }</div>
          </div>
        )
      })
    }