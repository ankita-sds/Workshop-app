import {getSessionsForWorkshop, castVote as vote} from "../../services/sessions"
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Alert, ListGroup, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '../../components/pages/sessionList.css';

const SessionsList = ( { id } ) => {
    //EXERCISE: Fetch the sessions for the workshop with this id,and show the sessions (use map to iterate through the list of sessions 
    //and create a list item for every session)

    const [sessions, setSessions] = useState([]);
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    useEffect(()=>{
        getSessionsForWorkshop( id )
            .then((data) => {
                setSessions(data);
            })
            .catch(error => {
                setError( error );
            })
            .finally(() => {
                setLoading( false );
            });
    },[]);

    const getBadgeTheme = ( level ) => {
        const classes = {
            Basic: 'primary',
            Intermediate: 'info',
            Advanced: 'warning',
        };

        return classes[level];
    };

    const castVote = async ( event, id, voteType ) => {
        // console.log( event );
        // console.log( id );
        // console.log( voteType );
        try {
            const updateSession = await vote( id, voteType );
            
            const updatedSessions = sessions.map(
                session => {
                    if( session.id === id ) {
                        return updateSession;
                    } else {
                        return session;
                    }
                }
            );

            setSessions( updatedSessions ); // React will now re-render the component
            toast.success( 'Your vote has been captured' );
        } catch( error ) {
            toast.error( error.message /*, { autoClose: 3000 } */ );
        }

    };

    return (
         <div>
            <h2>
                List of sessions
                <Button
                    variant="primary"
                    className="float-end"
                    as={Link}
                    to={`/workshops/${id}/add`}
                >
                    Add session
                </Button>
            </h2>
            <hr />
            {
                loading && (
                    <Alert variant="info">
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
                    <ListGroup>
                        {
                            // sessions.map( 
                            //     session => ( 
                            //         <ListGroup.Item key={session.id} >
                            //             {session.name}
                            //         </ListGroup.Item>
                            //     )
                            // )
                            sessions.map(
                                ( { id, upvoteCount, name, speaker, level, duration, abstract} ) => (
                                    <ListGroup.Item key={id}>
                                        <Row>
                                            <Col xs={1} className="d-flex flex-column align-items-center">
                                                <FontAwesomeIcon 
                                                    icon={faCaretUp} 
                                                    className="fa-2x voting-button"
                                                    onClick={( event ) => castVote( event, id, 'upvote' )} 
                                                />
                                                {upvoteCount}
                                                <FontAwesomeIcon 
                                                    icon={faCaretDown} 
                                                    className="fa-2x voting-button" 
                                                    onClick={( event ) => castVote( event, id, 'downvote' )}
                                                />
                                            </Col>
                                            <Col xs={11}>
                                                <div>{name}</div>
                                                <div>{speaker}</div>
                                                <div>
                                                    <Badge bg={getBadgeTheme( level )}>{level}</Badge>
                                                </div>
                                                <div>{duration}</div>
                                                <div>{abstract}</div>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            )
                        }
                    </ListGroup>
                )
            }
        </div>
    );
}
 
export default SessionsList;