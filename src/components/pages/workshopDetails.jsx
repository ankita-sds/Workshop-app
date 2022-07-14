import { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Alert, Image, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment'
import { getWorkshopById } from '../../services/workshop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import SessionsList from '../../components/pages/sessionList'
import AddSession from './AddSessions';
import { useSelector } from 'react-redux';

const dateFormat = "MMM DD yyyy";

const WorkshopDetails = (/*{ theme }*/) => {

    const theme = useSelector( state => state.value )

    const [ workshop, setWorkshop ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    const { id } = useParams(); // returns an object with all dynamic param values

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const workshop = await getWorkshopById( id );
                setWorkshop( workshop );
            } catch( error ) {
                setError( error );
            } finally {
                setLoading( false );
            }
        };

        fetchWorkshop();
    }, []);

    return (
        <>
            {
                loading && (
                    <Alert variant="info">
                        Please wait while we load the details of this workshop
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
                    <>
                        <h1>{workshop.name}</h1>
                        <hr />
                        <Row className={`bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'}`}>
                            <Col xs={12} lg={4}>
                                <Image src={workshop.imageUrl} fluid />
                            </Col>
                            <Col xs={12} lg={8}>
                                <Row xs={2} lg={4}>
                                    <Col>
                                        <div>
                                            <small>
                                                <Moment format={dateFormat}>
                                                    {workshop.startDate}
                                                </Moment> -
                                                <Moment format={dateFormat}>
                                                    {workshop.endDate}
                                                </Moment>
                                            </small>
                                        </div>
                                        <div className="mt-3">
                                            {workshop.time}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            {workshop.modes.inPerson ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                            <span className="ms-2">inPerson</span>
                                        </div>
                                        
                                        <div className="mt-3">
                                            {workshop.modes.online ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                            <span className="ms-2">Online</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <div dangerouslySetInnerHTML={{ __html: workshop.description }}></div>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs={12}>
                                <Route path="/workshops/:id" exact>
                                    {/* <SessionsList id={id} filter={true} /> */}
                                    <SessionsList id={id}  />
                                </Route>
                                <Route path="/workshops/:id/add">
                                    <AddSession id={id} />
                                </Route>
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    );
}
 
export default WorkshopDetails;