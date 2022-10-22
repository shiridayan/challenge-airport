import all_data from './data/flights.json' assert { type:"json" }
import log from '@ajar/marker'; 
import Flight from './modules/Flight.mjs';
import FlightManager from './modules/FlightManage.mjs';

const flight_array = all_data.flights;

const fm = new FlightManager();

for (let flight_data of flight_array) {

    const flight = fm.create_flight(flight_data);

    flight.on(Flight.FLIGHT_ARRIVED, print_flight_info);

    flight.depart();
}

log.magenta('=============================================');
log.yellow(fm.flights_count , ' flights were created');
log.d('destinations: ', fm.destinations);
log.magenta('=============================================')


function print_flight_info(instance) {
    log.blue(`✈️ Arrived: ${instance.flight_number}`, ' from: ', instance.origin, ' to ', instance.destination, ' at ', instance.arrived);
}