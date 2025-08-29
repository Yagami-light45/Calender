import React from 'react';
import { Plus, Calendar, List, Menu } from 'lucide-react';

const CalendarHeader = ({
  currentDate,
  selectedDate,
  activeTab,
  onTabChange,
  onAddEventClick,
  onMenuClick
}) => {
  const formatDate = (date, options) => date.toLocaleDateString('en-US', options);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">
              {formatDate(currentDate, { year: 'numeric', month: 'long' })}
            </h1>
            <p className="text-xs text-gray-500">
              {formatDate(selectedDate, { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <button onClick={onAddEventClick} className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'month', icon: Calendar, label: 'Month' },
          { id: 'list', icon: List, label: 'List' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;