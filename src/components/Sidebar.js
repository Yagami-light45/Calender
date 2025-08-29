import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, calendarDays, selectedDate, onDateSelect, getEventsForDate }) => {
  if (!isOpen) return null;

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="w-72 h-full bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Calendar</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDays.map((day) => (
            <div key={day} className="text-xs text-gray-500 text-center py-1">{day}</div>
          ))}
          {calendarDays.map((date, index) => (
            <button
              key={index}
              onClick={() => date && onDateSelect(date)}
              className={`h-8 text-xs flex items-center justify-center rounded relative ${
                !date ? '' :
                isToday(date) ? 'bg-gray-900 text-white' :
                isSelected(date) ? 'bg-gray-200 text-gray-900' :
                'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {date && date.getDate()}
              {date && getEventsForDate(date).length > 0 && (
                <div className="absolute bottom-1 w-1 h-1 bg-gray-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;