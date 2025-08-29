import React from 'react';

const SelectedDayEvents = ({ selectedDate, events, onDeleteEvent }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const priorityStyles = {
    high: 'bg-gray-800 text-white border-gray-800',
    medium: 'bg-gray-400 text-white border-gray-400',
    low: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <div className="p-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        {formatDate(selectedDate)}
      </h3>
      
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No events scheduled.</p>
      ) : (
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border ${priorityStyles[event.priority]} group relative`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{event.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-75">{event.time}</span>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="opacity-0 group-hover:opacity-100 text-xs hover:bg-black hover:bg-opacity-10 rounded px-1 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedDayEvents;