import Flight from "./Flight.mjs";

class FlightManager {

    #flights_count = 0;
    #destinations = [];

    get flights_count(){ return this.#flights_count;}
    set flights_count(v) { throw new Error('flight_count is read-only...')}

    get destinations(){ return this.#destinations;}
    set destinations(v) { throw new Error('destinations is read-only...')}

    create_flight(data) {

        const flight = new Flight(data);

        this.#flights_count++;

        if (!this.#destinations.includes(flight.destination)) {
            this.#destinations.push(flight.destination)
        }

        return flight;
    }
};

export default FlightManager;