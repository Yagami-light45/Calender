
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthNavigator = ({ currentDate, onNavigate }) => {
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
      <button onClick={() => onNavigate(-1)} className="p-2 hover:bg-white rounded-lg">
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div className="text-sm font-medium text-gray-900">
        {formatMonthYear(currentDate)}
      </div>
      <button onClick={() => onNavigate(1)} className="p-2 hover:bg-white rounded-lg">
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default MonthNavigator;