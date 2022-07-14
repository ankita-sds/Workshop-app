import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Moment from 'react-moment';
import { getWorkshop } from "../../services/workshop";

const dateFormat = "ddd DD-MM-yyyy";

const WorkshopsList = (/*{theme}*/) => {
    // useState() is used to request React to maintain data for the component instance that shall change with time ("state")
    // workshops state data for a component instance will be maintained
    const [ workshops, setWorkshops ] = useState([]); // [ data, setter for the data ]
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );
    const [ page, setPage ] = useState( 1 );

    // useEffect() can be used when we want to do something on first load (like fetching data)
    // 2nd argument
        // - not passed : the effect function runs on first load, and every state / prop change
        // - [] : the effect function runs only on first load
        // - [ page ] : the effect function runs on first load, as well as page variable change
    useEffect(() => { // effect function
        getWorkshop( page )
            .then((data) => {
                setWorkshops(data);
            })
            .catch(error => {
                setError( error );
            })
            .finally(() => { // executes in case of both success, failure
                setLoading( false );
            });
    }, [ page ]);

    // const cols = [];

    // for( let i = 0; i < workshops.length; i++ ) {
    //     const workshop = workshops[i];

    //     cols.push(
    //         <Col>
    //             <Card>
    //                 <Card.Img variant="top" src={workshop.imageUrl} />
    //                 <Card.Body>
    //                     <Card.Title>{workshop.name}</Card.Title>
    //                     <Card.Text>
    //                         <Moment format={dateFormat}>
    //                             {workshop.startDate}
    //                         </Moment> -
    //                         <Moment format={dateFormat}>
    //                             {workshop.endDate}
    //                         </Moment>
    //                     </Card.Text>
    //                     <Button variant="primary">Know more</Button>
    //                 </Card.Body>
    //             </Card>
    //         </Col>
    //     );
    // }

    return (
        <div>
            <h1>
                List of workshops
                <Button
                    variant="primary"
                    className="float-end ms-2"
                    onClick={() => setPage( page + 1)}
                >
                    Next page
                </Button>
                <Button
                    variant="primary"
                    className="float-end"
                    onClick={() => setPage( page - 1)}
                >
                    Previous page
                </Button>
            </h1>
            <hr />
            {/* Use ? : for showing alternatives */}
            {
                loading && (
                    <Alert variant="info" data-testid="loading-message">
                        Please wait while we load the workshops
                    </Alert>
                )
            }
            {
                error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !loading && !error && (
                    <Row xs={1} md={2} lg={3}>
                        {
                            workshops.map(
                                workshop => (
                                    <Col key={workshop.id} className="d-flex mb-3 text-reset text-decoration-none" as={Link} to={`/workshops/${workshop.id}`}>
                                        <Card className="align-items-stretch w-100 p-5">
                                            <Card.Img variant="top" src={workshop.imageUrl} />
                                            <Card.Body>
                                                <Card.Title>{workshop.name}</Card.Title>
                                                <Card.Text>
                                                    <Moment format={dateFormat}>
                                                        {workshop.startDate}
                                                    </Moment> -
                                                    <Moment format={dateFormat}>
                                                        {workshop.endDate}
                                                    </Moment>
                                                </Card.Text>
                                                {/* <Button variant="primary">Know more</Button> */}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            )
                        }
                    </Row>
                )
            }
        </div>
    );
};

export default WorkshopsList;