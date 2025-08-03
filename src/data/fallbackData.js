// Fallback data for when API is unavailable
export const fallbackBusStands = [
  'Delhi', 'Chandigarh', 'Gurgaon', 'Faridabad', 'Panipat', 'Karnal', 
  'Ambala', 'Hisar', 'Rohtak', 'Sonipat', 'Yamunanagar', 'Kurukshetra',
  'Sirsa', 'Bhiwani', 'Jind', 'Kaithal', 'Rewari', 'Mahendragarh',
  'Palwal', 'Nuh', 'Panchkula', 'Yamuna Nagar'
];

export const fallbackBusData = [
  {
    Bus_Type: 'AC Deluxe',
    from: 'Delhi',
    to: 'Chandigarh',
    Via: 'Panipat, Karnal, Kurukshetra',
    Departure_Time: '06:00 AM',
    Price: '₹450',
    Total_Distance: '250 KM'
  },
  {
    Bus_Type: 'Ordinary',
    from: 'Delhi',
    to: 'Hisar',
    Via: 'Rohtak, Bhiwani',
    Departure_Time: '07:30 AM',
    Price: '₹280',
    Total_Distance: '180 KM'
  },
  {
    Bus_Type: 'Express',
    from: 'Gurgaon',
    to: 'Chandigarh',
    Via: 'Sonipat, Panipat, Karnal',
    Departure_Time: '08:00 AM',
    Price: '₹380',
    Total_Distance: '220 KM'
  }
];