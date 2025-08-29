import React from 'react';

const CalendarGrid = ({ calendarDays, selectedDate, onDateSelect, getEventsForDate }) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date && date.toDateString() === selectedDate.toDateString();
  };

  const dotStyles = {
    high: 'bg-gray-800',
    medium: 'bg-gray-400',
    low: 'bg-gray-300'
  };
  
  return (
    <div className="bg-white">
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map((day, i) => (
          <div key={i} className="p-3 text-center">
            <span className="text-xs font-medium text-gray-500">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => (
          <div
            key={index}
            className={`min-h-16 p-2 border-r border-b border-gray-100 ${
              !date ? 'bg-gray-50' :
              isToday(date) ? 'bg-gray-900' :
              isSelected(date) ? 'bg-gray-200' : 'bg-white'
            } transition-colors`}
            onClick={() => date && onDateSelect(date)}
          >
            {date && (
              <>
                <div className={`text-xs font-medium mb-1 ${
                  isToday(date) ? 'text-white' :
                  isSelected(date) ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {date.getDate()}
                </div>
                {getEventsForDate(date).length > 0 && (
                  <div className="flex gap-0.5 mt-1">
                    {getEventsForDate(date).slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${dotStyles[event.priority]}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;