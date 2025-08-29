import React from 'react';

const EventListView = ({ events, onDeleteEvent }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const priorityStyles = {
    high: 'bg-gray-800 text-white border-gray-800',
    medium: 'bg-gray-400 text-white border-gray-400',
    low: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <div className="p-4 space-y-4">
      {sortedEvents.length > 0 ? sortedEvents.map((event) => (
        <div
          key={event.id}
          className={`p-4 rounded-lg border ${priorityStyles[event.priority]} group relative`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium pr-8">{event.title}</h3>
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
          <p className="text-xs opacity-75">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
      )) : (
        <p className="text-center text-gray-500 mt-8">No upcoming events.</p>
      )}
    </div>
  );
};

export default EventListView;