export interface Bus {
  id: string;
  busNumber: string;
  operator: string;
  busType: 'AC Electric' | 'AC Sleeper' | 'AC Seater' | 'Non-AC Seater' | 'Non-AC Sleeper' | 'Electric';
  fuelType: 'Electric' | 'CNG' | 'Diesel';
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  pickupPoints: string[];
  dropPoints: string[];
  distance: number;
  fare: number | null;
  amenities: string[];
  gpsAvailable: boolean;
  cctv: boolean;
  emergencyButton: boolean;
  accessibility: boolean;
  status: 'active' | 'delayed' | 'cancelled';
  serviceType: 'intracity' | 'intercity';
  region: string;
}

export interface Route {
  id: string;
  source: string;
  destination: string;
  distance: number;
  duration: string;
  stops: string[];
  services: number;
  region: string;
  status: 'active' | 'pending' | 'suspended';
  busTypes: string[];
  firstDeparture: string;
  lastDeparture: string;
  frequency: string;
}

export interface BusStop {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  routes: string[];
  facilities: string[];
  operatingHours: string;
}

export interface Announcement {
  id: string;
  date: string;
  category: 'New Routes' | 'Timetable' | 'Fare Updates' | 'Service Alerts' | 'Bus Launches' | 'Safety' | 'Infrastructure';
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  source: string;
  important: boolean;
}

export interface City {
  id: string;
  name: string;
  nameHi: string;
  region: string;
  totalBuses: number;
  intercityBuses: number;
  intracityBuses: number;
  majorDestinations: string[];
  majorStops: string[];
  description: string;
  descriptionHi: string;
}

export interface SearchFilters {
  from: string;
  to: string;
  date: string;
  departureTime: string;
  busType: string;
  acOnly: boolean;
  electricOnly: boolean;
  intracity: boolean;
  directOnly: boolean;
}
