import React, { useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import MonthNavigator from './components/MonthNavigator';
import CalendarGrid from './components/CalendarGrid';
import SelectedDayEvents from './components/SelectedDayEvents';
import EventListView from './components/EventListView';
import EventModal from './components/EventModal';
import Sidebar from './components/Sidebar';

const MobileCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Helper to get date string (YYYY-MM-DD)
  const getCurrentDateString = (date) => date.toISOString().split('T')[0];

  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', time: '09:00', date: getCurrentDateString(today), priority: 'high' },
    { id: 2, title: 'Lunch', time: '12:30', date: getCurrentDateString(today), priority: 'low' },
    { id: 3, title: 'Design Review', time: '14:00', date: getCurrentDateString(tomorrow), priority: 'medium' },
    { id: 4, title: 'Gym', time: '18:00', date: getCurrentDateString(tomorrow), priority: 'low' },
    { id: 5, title: 'Movie Night', time: '20:00', date: getCurrentDateString(dayAfter), priority: 'low' },
    { id: 6, title: 'Client Call', time: '10:00', date: getCurrentDateString(dayAfter), priority: 'high' },
  ]);

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const addEvent = ({ title, time, priority }) => {
    const newEvent = {
      id: Date.now(),
      title,
      time: time || '09:00',
      date: getCurrentDateString(selectedDate),
      priority,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setShowEventModal(false);
  };

  const deleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-white">
      <CalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddEventClick={() => setShowEventModal(true)}
        onMenuClick={() => setShowSidebar(true)}
      />
      
      <MonthNavigator
        currentDate={currentDate}
        onNavigate={navigateMonth}
      />
      
      {activeTab === 'month' ? (
        <>
          <CalendarGrid
            calendarDays={calendarDays}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            getEventsForDate={getEventsForDate}
          />
          <SelectedDayEvents
            selectedDate={selectedDate}
            events={todayEvents}
            onDeleteEvent={deleteEvent}
          />
        </>
      ) : (
        <EventListView
          events={events}
          onDeleteEvent={deleteEvent}
        />
      )}
      
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        calendarDays={calendarDays}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date);
          setShowSidebar(false);
        }}
        getEventsForDate={getEventsForDate}
      />

      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onAddEvent={addEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MobileCalendar;