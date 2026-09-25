import { Bus, Route, BusStop, Announcement, City } from '../types';

export const CITIES = ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Dewas', 'Dhar', 'Shivpuri', 'Morena', 'Shahdol', 'Umaria', 'Anuppur', 'Dindori', 'Maihar', 'Narsinghpur', 'Singrauli'];

export const cities: City[] = [
  { id: 'indore', name: 'Indore', nameHi: 'इंदौर', region: 'indore', totalBuses: 145, intercityBuses: 50, intracityBuses: 95, majorDestinations: ['Bhopal', 'Ujjain', 'Dewas', 'Dhar', 'Jabalpur', 'Rewa'], majorStops: ['AICTSL Campus', 'Teen Imli Bus Stand', 'Sarwate Bus Stand'], description: 'Indore is the largest city in MP and the primary hub for Sugam Parivahan services with 145 allocated buses.', descriptionHi: 'इंदौर मध्य प्रदेश का सबसे बड़ा शहर है और सुगम परिवहन सेवाओं का प्राथमिक केंद्र है।' },
  { id: 'bhopal', name: 'Bhopal', nameHi: 'भोपाल', region: 'bhopal', totalBuses: 120, intercityBuses: 60, intracityBuses: 60, majorDestinations: ['Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'], majorStops: ['Bhopal ISBT', 'Habibganj Bus Stand'], description: 'Bhopal, the capital of Madhya Pradesh, serves as a major transport hub connecting all regions.', descriptionHi: 'भोपाल, मध्य प्रदेश की राजधानी, सभी क्षेत्रों को जोड़ने वाला प्रमुख परिवहन केंद्र है।' },
  { id: 'jabalpur', name: 'Jabalpur', nameHi: 'जबलपुर', region: 'jabalpur', totalBuses: 85, intercityBuses: 45, intracityBuses: 40, majorDestinations: ['Bhopal', 'Indore', 'Rewa', 'Sagar', 'Narsinghpur'], majorStops: ['Jabalpur Bus Stand', 'Adhartal Bus Stand'], description: 'Jabalpur serves the eastern region of Madhya Pradesh with connections to major cities.', descriptionHi: 'जबलपुर मध्य प्रदेश के पूर्वी क्षेत्र की सेवा करता है।' },
  { id: 'gwalior', name: 'Gwalior', nameHi: 'ग्वालियर', region: 'gwalior', totalBuses: 75, intercityBuses: 40, intracityBuses: 35, majorDestinations: ['Bhopal', 'Shivpuri', 'Morena', 'Jhansi'], majorStops: ['Gwalior Bus Stand'], description: 'Gwalior connects the northern region of MP with the rest of the state.', descriptionHi: 'ग्वालियर मध्य प्रदेश के उत्तरी क्षेत्र को जोड़ता है।' },
  { id: 'ujjain', name: 'Ujjain', nameHi: 'उज्जैन', region: 'ujjain', totalBuses: 60, intercityBuses: 30, intracityBuses: 30, majorDestinations: ['Indore', 'Dewas', 'Bhopal', 'Dhar'], majorStops: ['Ujjain Bus Stand', 'Nagziri Bus Stand'], description: 'Ujjain, the spiritual capital, has growing bus connectivity under Sugam Parivahan.', descriptionHi: 'उज्जैन, आध्यात्मिक राजधानी, सुगम परिवहन के तहत बढ़ता बस कनेक्टिविटी है।' },
  { id: 'sagar', name: 'Sagar', nameHi: 'सागर', region: 'sagar', totalBuses: 50, intercityBuses: 30, intracityBuses: 20, majorDestinations: ['Bhopal', 'Jabalpur', 'Damoh', 'Vidisha'], majorStops: ['Sagar Bus Stand'], description: 'Sagar serves the central-eastern region with connections to major cities.', descriptionHi: 'सागर केंद्रीय-पूर्वी क्षेत्र की सेवा करता है।' },
  { id: 'rewa', name: 'Rewa', nameHi: 'रीवा', region: 'rewa', totalBuses: 45, intercityBuses: 25, intracityBuses: 20, majorDestinations: ['Jabalpur', 'Satna', 'Singrauli', 'Indore'], majorStops: ['Rewa Bus Stand'], description: 'Rewa connects the southeastern region of Madhya Pradesh.', descriptionHi: 'रीवा मध्य प्रदेश के दक्षिण-पूर्वी क्षेत्र को जोड़ता है।' },
];

export const routes: Route[] = [
  { id: 'indore-bhopal', source: 'Indore', destination: 'Bhopal', distance: 198, duration: '3h 30m', stops: ['Dewas', 'Sehore'], services: 12, region: 'indore', status: 'active', busTypes: ['AC Electric', 'AC Seater', 'Non-AC Seater'], firstDeparture: '05:30', lastDeparture: '21:00', frequency: 'Every 45 min' },
  { id: 'indore-ujjain', source: 'Indore', destination: 'Ujjain', distance: 55, duration: '1h 15m', stops: [], services: 20, region: 'indore', status: 'active', busTypes: ['AC Electric', 'Electric', 'Non-AC Seater'], firstDeparture: '05:00', lastDeparture: '22:00', frequency: 'Every 20 min' },
  { id: 'indore-dewas', source: 'Indore', destination: 'Dewas', distance: 38, duration: '50m', stops: [], services: 18, region: 'indore', status: 'active', busTypes: ['Electric', 'Non-AC Seater'], firstDeparture: '05:30', lastDeparture: '21:30', frequency: 'Every 25 min' },
  { id: 'indore-dhar', source: 'Indore', destination: 'Dhar', distance: 34, duration: '45m', stops: [], services: 15, region: 'indore', status: 'active', busTypes: ['Non-AC Seater', 'Electric'], firstDeparture: '06:00', lastDeparture: '20:30', frequency: 'Every 30 min' },
  { id: 'indore-jabalpur', source: 'Indore', destination: 'Jabalpur', distance: 378, duration: '6h 30m', stops: ['Bhopal', 'Sagar'], services: 6, region: 'indore', status: 'active', busTypes: ['AC Sleeper', 'AC Seater'], firstDeparture: '06:00', lastDeparture: '18:00', frequency: 'Every 2 hours' },
  { id: 'indore-rewa', source: 'Indore', destination: 'Rewa', distance: 550, duration: '9h', stops: ['Bhopal', 'Jabalpur'], services: 3, region: 'indore', status: 'active', busTypes: ['AC Sleeper'], firstDeparture: '06:00', lastDeparture: '14:00', frequency: 'Twice daily' },
  { id: 'bhopal-indore', source: 'Bhopal', destination: 'Indore', distance: 198, duration: '3h 30m', stops: ['Dewas'], services: 12, region: 'bhopal', status: 'active', busTypes: ['AC Electric', 'AC Seater', 'Non-AC Seater'], firstDeparture: '05:00', lastDeparture: '21:00', frequency: 'Every 45 min' },
  { id: 'bhopal-jabalpur', source: 'Bhopal', destination: 'Jabalpur', distance: 280, duration: '4h 45m', stops: ['Sagar'], services: 8, region: 'bhopal', status: 'active', busTypes: ['AC Seater', 'Non-AC Seater'], firstDeparture: '05:30', lastDeparture: '19:00', frequency: 'Every 90 min' },
  { id: 'gwalior-bhopal', source: 'Gwalior', destination: 'Bhopal', distance: 423, duration: '6h', stops: ['Shivpuri', 'Vidisha'], services: 5, region: 'gwalior', status: 'active', busTypes: ['AC Seater', 'AC Sleeper'], firstDeparture: '06:00', lastDeparture: '17:00', frequency: 'Every 2 hours' },
  { id: 'ujjain-indore', source: 'Ujjain', destination: 'Indore', distance: 55, duration: '1h 15m', stops: [], services: 20, region: 'ujjain', status: 'active', busTypes: ['AC Electric', 'Electric', 'Non-AC Seater'], firstDeparture: '05:00', lastDeparture: '22:00', frequency: 'Every 20 min' },
  { id: 'indore-singrauli', source: 'Indore', destination: 'Singrauli', distance: 889, duration: '15h', stops: ['Bhopal', 'Jabalpur', 'Rewa'], services: 1, region: 'indore', status: 'pending', busTypes: ['AC Sleeper'], firstDeparture: '16:00', lastDeparture: '16:00', frequency: 'Daily' },
  { id: 'bhopal-gwalior', source: 'Bhopal', destination: 'Gwalior', distance: 423, duration: '6h', stops: ['Vidisha', 'Shivpuri'], services: 5, region: 'bhopal', status: 'active', busTypes: ['AC Seater', 'AC Sleeper'], firstDeparture: '06:00', lastDeparture: '17:00', frequency: 'Every 2 hours' },
];

export const buses: Bus[] = [
  { id: 'b1', busNumber: 'MP-SG-001', operator: 'Sugam Parivahan', busType: 'AC Electric', fuelType: 'Electric', from: 'Indore', to: 'Bhopal', departureTime: '06:30', arrivalTime: '10:00', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Bhopal ISBT'], distance: 198, fare: null, amenities: ['WiFi', 'USB Charging', 'GPS', 'CCTV', 'Emergency Button'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b2', busNumber: 'MP-SG-002', operator: 'Sugam Parivahan', busType: 'AC Seater', fuelType: 'CNG', from: 'Indore', to: 'Bhopal', departureTime: '08:00', arrivalTime: '11:30', pickupPoints: ['AICTSL Campus, Indore', 'Teen Imli'], dropPoints: ['Bhopal ISBT', 'Habibganj'], distance: 198, fare: null, amenities: ['GPS', 'CCTV', 'USB Charging'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b3', busNumber: 'MP-SG-010', operator: 'Sugam Parivahan', busType: 'Electric', fuelType: 'Electric', from: 'Indore', to: 'Ujjain', departureTime: '07:00', arrivalTime: '08:15', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Ujjain Bus Stand'], distance: 55, fare: null, amenities: ['GPS', 'CCTV', 'Low Floor'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b4', busNumber: 'MP-SG-015', operator: 'Sugam Parivahan', busType: 'Non-AC Seater', fuelType: 'CNG', from: 'Indore', to: 'Dewas', departureTime: '06:45', arrivalTime: '07:35', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Dewas Bus Stand'], distance: 38, fare: null, amenities: ['GPS', 'CCTV'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b5', busNumber: 'MP-SG-020', operator: 'Sugam Parivahan', busType: 'AC Electric', fuelType: 'Electric', from: 'Indore', to: 'Dhar', departureTime: '07:30', arrivalTime: '08:15', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Dhar Bus Stand'], distance: 34, fare: null, amenities: ['WiFi', 'GPS', 'CCTV', 'USB Charging'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b6', busNumber: 'MP-SG-030', operator: 'Sugam Parivahan', busType: 'AC Sleeper', fuelType: 'Diesel', from: 'Indore', to: 'Jabalpur', departureTime: '06:00', arrivalTime: '12:30', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Jabalpur Bus Stand', 'Adhartal'], distance: 378, fare: null, amenities: ['WiFi', 'GPS', 'CCTV', 'Charging', 'Blanket', 'Water'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: false, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b7', busNumber: 'MP-SG-035', operator: 'Sugam Parivahan', busType: 'AC Sleeper', fuelType: 'Diesel', from: 'Indore', to: 'Rewa', departureTime: '14:00', arrivalTime: '23:00', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Rewa Bus Stand'], distance: 550, fare: null, amenities: ['GPS', 'CCTV', 'Charging', 'Water'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: false, status: 'active', serviceType: 'intercity', region: 'indore' },
  { id: 'b8', busNumber: 'MP-SG-040', operator: 'Sugam Parivahan', busType: 'AC Electric', fuelType: 'Electric', from: 'Bhopal', to: 'Indore', departureTime: '06:00', arrivalTime: '09:30', pickupPoints: ['Bhopal ISBT'], dropPoints: ['AICTSL Campus, Indore'], distance: 198, fare: null, amenities: ['WiFi', 'GPS', 'CCTV', 'USB Charging'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'bhopal' },
  { id: 'b9', busNumber: 'MP-SG-050', operator: 'Sugam Parivahan', busType: 'AC Seater', fuelType: 'CNG', from: 'Bhopal', to: 'Jabalpur', departureTime: '07:00', arrivalTime: '11:45', pickupPoints: ['Bhopal ISBT'], dropPoints: ['Jabalpur Bus Stand'], distance: 280, fare: null, amenities: ['GPS', 'CCTV', 'USB Charging', 'Water'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'bhopal' },
  { id: 'b10', busNumber: 'MP-SG-060', operator: 'Sugam Parivahan', busType: 'AC Seater', fuelType: 'Diesel', from: 'Gwalior', to: 'Bhopal', departureTime: '06:30', arrivalTime: '12:30', pickupPoints: ['Gwalior Bus Stand'], dropPoints: ['Bhopal ISBT'], distance: 423, fare: null, amenities: ['GPS', 'CCTV', 'Charging'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'delayed', serviceType: 'intercity', region: 'gwalior' },
  { id: 'b11', busNumber: 'MP-SG-070', operator: 'Sugam Parivahan', busType: 'Electric', fuelType: 'Electric', from: 'Ujjain', to: 'Indore', departureTime: '06:30', arrivalTime: '07:45', pickupPoints: ['Ujjain Bus Stand'], dropPoints: ['AICTSL Campus, Indore'], distance: 55, fare: null, amenities: ['GPS', 'CCTV', 'Low Floor'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: true, status: 'active', serviceType: 'intercity', region: 'ujjain' },
  { id: 'b12', busNumber: 'MP-SG-080', operator: 'Sugam Parivahan', busType: 'AC Sleeper', fuelType: 'Diesel', from: 'Indore', to: 'Singrauli', departureTime: '16:00', arrivalTime: '07:00', pickupPoints: ['AICTSL Campus, Indore'], dropPoints: ['Singrauli Bus Stand'], distance: 889, fare: null, amenities: ['GPS', 'CCTV', 'Charging', 'Blanket', 'Water', 'Snacks'], gpsAvailable: true, cctv: true, emergencyButton: true, accessibility: false, status: 'active', serviceType: 'intercity', region: 'indore' },
];

export const busStops: BusStop[] = [
  { id: 's1', name: 'AICTSL Campus / Chartered Bus Depot', city: 'Indore', address: 'AICTSL Campus, Chartered Bus Depot Area, Indore', latitude: 22.7196, longitude: 75.8577, routes: ['Indore-Bhopal', 'Indore-Ujjain', 'Indore-Dewas', 'Indore-Dhar', 'Indore-Jabalpur', 'Indore-Rewa'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Water', 'Parking'], operatingHours: '05:00 - 22:00' },
  { id: 's2', name: 'Teen Imli Bus Stand', city: 'Indore', address: 'Teen Imli, Near MG Road, Indore', latitude: 22.7153, longitude: 75.8376, routes: ['Indore-Bhopal', 'Indore-Ujjain'], facilities: ['Waiting Area', 'Ticket Counter', 'Water'], operatingHours: '05:30 - 21:00' },
  { id: 's3', name: 'Sarwate Bus Stand / Indore Junction', city: 'Indore', address: 'Near Indore Junction Railway Station, Sarwate Bus Stand', latitude: 22.7174, longitude: 75.8474, routes: ['Indore-Dewas', 'Indore-Dhar'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Food Stalls', 'Parking'], operatingHours: '05:00 - 23:00' },
  { id: 's4', name: 'Bhopal ISBT', city: 'Bhopal', address: 'Inter State Bus Terminal, Bhopal', latitude: 23.2599, longitude: 77.4126, routes: ['Bhopal-Indore', 'Bhopal-Jabalpur', 'Bhopal-Gwalior'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Food Court', 'Parking', 'WiFi'], operatingHours: '04:00 - 23:00' },
  { id: 's5', name: 'Habibganj Bus Stand', city: 'Bhopal', address: 'Habibganj, Near Railway Station, Bhopal', latitude: 23.2320, longitude: 77.4210, routes: ['Bhopal-Indore'], facilities: ['Waiting Area', 'Ticket Counter', 'Water'], operatingHours: '05:00 - 22:00' },
  { id: 's6', name: 'Jabalpur Bus Stand', city: 'Jabalpur', address: 'Main Bus Stand, Jabalpur', latitude: 23.1815, longitude: 79.9864, routes: ['Jabalpur-Indore', 'Jabalpur-Bhopal', 'Jabalpur-Rewa'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Food Stalls', 'Parking'], operatingHours: '04:30 - 23:00' },
  { id: 's7', name: 'Gwalior Bus Stand', city: 'Gwalior', address: 'City Bus Stand, Gwalior', latitude: 26.2183, longitude: 78.1828, routes: ['Gwalior-Bhopal'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Parking'], operatingHours: '05:00 - 22:00' },
  { id: 's8', name: 'Ujjain Bus Stand', city: 'Ujjain', address: 'Nagziri Bus Stand, Ujjain', latitude: 23.1765, longitude: 75.7885, routes: ['Ujjain-Indore'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Water'], operatingHours: '04:30 - 22:30' },
  { id: 's9', name: 'Sagar Bus Stand', city: 'Sagar', address: 'Main Bus Stand, Sagar', latitude: 23.8385, longitude: 78.7390, routes: ['Sagar-Bhopal', 'Sagar-Jabalpur'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom'], operatingHours: '05:00 - 22:00' },
  { id: 's10', name: 'Rewa Bus Stand', city: 'Rewa', address: 'Main Bus Stand, Rewa', latitude: 24.5373, longitude: 81.2986, routes: ['Rewa-Indore', 'Rewa-Jabalpur'], facilities: ['Waiting Area', 'Ticket Counter', 'Washroom', 'Water'], operatingHours: '05:00 - 22:00' },
];

export const announcements: Announcement[] = [
  { id: 'a1', date: '2026-09-25', category: 'Bus Launches', title: 'Mukhyamantri Sugam Parivahan Seva Launched', titleHi: 'मुख्यमंत्री सुगम परिवहन सेवा का शुभारंभ', summary: 'The Hon\'ble Chief Minister launched 351 buses across 7 regional transport divisions in Madhya Pradesh, marking a new era in public transportation.', summaryHi: 'माननीय मुख्यमंत्री ने मध्य प्रदेश में 7 क्षेत्रीय परिवहन प्रभागों में 351 बसों का शुभारंभ किया।', source: 'MP Government Press Release', important: true },
  { id: 'a2', date: '2026-09-25', category: 'New Routes', title: '145 Buses Allocated to Indore Division', titleHi: 'इंदौर प्रभाग को 145 बसें आवंटित', summary: 'Indore receives the largest allocation with 95 intracity and 50 intercity buses serving routes across the region.', summaryHi: 'इंदौर को 95 अंतःनगरीय और 50 अंतर्राज्यीय बसों के साथ सबसे बड़ा आवंटन मिला।', source: 'AICTSL', important: true },
  { id: 'a3', date: '2026-09-26', category: 'Safety', title: 'All Buses Equipped with GPS, CCTV & Emergency Systems', titleHi: 'सभी बसों में GPS, CCTV और आपातकालीन सिस्टम', summary: 'Every Sugam Parivahan bus is equipped with GPS tracking, CCTV cameras, and emergency panic buttons for passenger safety.', summaryHi: 'प्रत्येक सुगम परिवहन बस में यात्री सुरक्षा के लिए GPS ट्रैकिंग, CCTV कैमरे और आपातकालीन बटन हैं।', source: 'MP Transport Department', important: true },
  { id: 'a4', date: '2026-09-27', category: 'Timetable', title: 'Timetable Updates in Progress', titleHi: 'समय-सारणी अपडेट प्रगति पर', summary: 'Route timetables are being finalized and will be published progressively. Please check back for updates.', summaryHi: 'मार्ग समय-सारणी अंतिम रूप दी जा रही है और क्रमिक रूप से प्रकाशित की जाएगी।', source: 'Sugam Parivahan', important: false },
  { id: 'a5', date: '2026-09-28', category: 'Infrastructure', title: 'Electric Bus Charging Stations Being Set Up', titleHi: 'इलेक्ट्रिक बस चार्जिंग स्टेशन स्थापित किए जा रहे हैं', summary: 'Charging infrastructure for electric buses is being installed at major depots across the state.', summaryHi: 'राज्य भर के प्रमुख डिपो में इलेक्ट्रिक बसों के लिए चार्जिंग इंफ्रास्ट्रक्चर स्थापित किया जा रहा है।', source: 'MP Energy Department', important: false },
  { id: 'a6', date: '2026-09-29', category: 'New Routes', title: 'Indore-Singrauli Long Distance Route Announced', titleHi: 'इंदौर-सिंगरौली लंबी दूरी मार्ग की घोषणा', summary: 'A new long-distance route connecting Indore to Singrauli (~889 km) has been announced as part of the network expansion.', summaryHi: 'नेटवर्क विस्तार के हिस्से के रूप में इंदौर को सिंगरौली (~889 किमी) से जोड़ने वाला नया लंबी दूरी मार्ग घोषित।', source: 'MP Transport Department', important: false },
  { id: 'a7', date: '2026-09-30', category: 'Fare Updates', title: 'Fare Structure Under Review', titleHi: 'किराया संरचना समीक्षाधीन', summary: 'The fare structure for all routes is under review and will be published once finalized. Subsidized fares expected.', summaryHi: 'सभी मार्गों की किराया संरचना समीक्षाधीन है और अंतिम रूप देने के बाद प्रकाशित की जाएगी।', source: 'MP Transport Department', important: false },
];

export const popularRoutes = [
  { from: 'Indore', to: 'Bhopal', id: 'indore-bhopal' },
  { from: 'Indore', to: 'Ujjain', id: 'indore-ujjain' },
  { from: 'Indore', to: 'Dewas', id: 'indore-dewas' },
  { from: 'Indore', to: 'Dhar', id: 'indore-dhar' },
  { from: 'Indore', to: 'Jabalpur', id: 'indore-jabalpur' },
  { from: 'Indore', to: 'Rewa', id: 'indore-rewa' },
  { from: 'Bhopal', to: 'Indore', id: 'bhopal-indore' },
  { from: 'Bhopal', to: 'Jabalpur', id: 'bhopal-jabalpur' },
  { from: 'Gwalior', to: 'Bhopal', id: 'gwalior-bhopal' },
  { from: 'Ujjain', to: 'Indore', id: 'ujjain-indore' },
];

export const destinations = [
  { name: 'Bhopal', nameHi: 'भोपाल', routes: 12 },
  { name: 'Ujjain', nameHi: 'उज्जैन', routes: 20 },
  { name: 'Dewas', nameHi: 'देवास', routes: 18 },
  { name: 'Dhar', nameHi: 'धार', routes: 15 },
  { name: 'Jabalpur', nameHi: 'जबलपुर', routes: 8 },
  { name: 'Rewa', nameHi: 'रीवा', routes: 5 },
  { name: 'Gwalior', nameHi: 'ग्वालियर', routes: 6 },
  { name: 'Shivpuri', nameHi: 'शिवपुरी', routes: 4 },
  { name: 'Morena', nameHi: 'मुरैना', routes: 3 },
  { name: 'Shahdol', nameHi: 'शहडोल', routes: 3 },
  { name: 'Umaria', nameHi: 'उमरिया', routes: 2 },
  { name: 'Anuppur', nameHi: 'अनूपपुर', routes: 2 },
  { name: 'Dindori', nameHi: 'डिंडोरी', routes: 2 },
  { name: 'Maihar', nameHi: 'मैहर', routes: 2 },
  { name: 'Narsinghpur', nameHi: 'नरसिंहपुर', routes: 3 },
  { name: 'Singrauli', nameHi: 'सिंगरौली', routes: 1 },
];

export const statistics = {
  initialBuses: 351,
  indoreBuses: 145,
  indoreIntracity: 95,
  indoreIntercity: 50,
  regionalDivisions: 7,
  targetFleet2031: 15000,
};
