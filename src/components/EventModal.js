import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EventModal = ({ isOpen, onClose, onAddEvent, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('low');

  // Reset form when the modal is opened for a new date
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setTime('');
      setPriority('low');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAddEvent({ title, time, priority });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', month: 'short', day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">New Event</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            Event will be added to: {formatDate(selectedDate)}
          </div>
          
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-gray-700 text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={!title.trim()} className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;