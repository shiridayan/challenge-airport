import dayjs from "dayjs";
import log from "@ajar/marker";
import {EventEmitter} from "events";

class Flight extends EventEmitter {
    #flight_number;
    #destination;
    #origin;
    #departed;
    #arrived;

    static FLIGHT_ARRIVED = 'FLIGHT_ARRIVED';
    static FLIGHT_DEPARTED = 'FLIGHT_DEPARTED';

    constructor({number, origin, destination}) {
        super();

        this.#arrived = 0;
        this.#departed = 0;

        this.#flight_number = number;
        this.#origin = origin;
        this.#destination = destination;
    }

    get flight_number() {return this.#flight_number};
    set flight_number(v) {this.#flight_number = v};

    get destination() {return this.#destination};
    set destination(v) {this.#destination = v};

    get origin() {return this.#origin};
    set origin(v) {this.#origin = v};

    get departed() {return this.#departed};
    set departed(v) {throw new Error('departed is a read only property')};

    get arrived() {return this.#arrived};
    set arrived(v) {throw new Error('arrived is a read only property')};

    #arrive = () => {
        this.#arrived = dayjs().format('DD/MM/YYYY,HH:mm:ss');

        this.emit(Flight.FLIGHT_ARRIVED, this);
    }

    depart() {
        this.#departed = dayjs().format('DD/MM/YYYY,HH:mm:ss');
        log.magenta('✈️  departed: ', this.#departed, ' flight number: ', this.#flight_number);

        this.emit(Flight.FLIGHT_DEPARTED, this);

        const random_delay = 6 + (Math.random() * 4) * 1000;

        setTimeout(this.#arrive, random_delay);
    }
}

export default Flight;
