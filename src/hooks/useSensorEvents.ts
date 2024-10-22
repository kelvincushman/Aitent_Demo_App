import { useEffect, useState } from 'react';
import { SensorEvent } from '../types';
import { socketService } from '../services/socket';

export function useSensorEvents() {
  const [events, setEvents] = useState<SensorEvent[]>([]);

  useEffect(() => {
    const handleSensorEvent = (event: SensorEvent) => {
      setEvents(prevEvents => [event, ...prevEvents]);
    };

    socketService.connect();
    socketService.on('sensorEvent', handleSensorEvent);

    return () => {
      socketService.off('sensorEvent', handleSensorEvent);
      socketService.disconnect();
    };
  }, []);

  return events;
}