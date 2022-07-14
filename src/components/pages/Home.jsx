
import { Card } from "react-bootstrap";

const Home = () =>{
    return (
            <Card body className="p-5">
            <h2>Workshops App</h2>
                <hr />
                <p>
                    The Workshops application serves details of (fictitious) technical workshops happening in various cities. Every workshop has a broad topic (eg. JavaScript), and a workshop has many sessions (each session covers a sub-topic, eg. Closures in JavaScript).
                </p>
                <p>
                    You can view a list of workshops, details of every workshop, sessions in a workshop, and also add a new session for a workshop.
                </p>

            </Card>
    );
};

export default Home;