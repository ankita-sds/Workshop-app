import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { postSession } from '../../services/sessions';

const AddSession = ({ id }) => {
    const [ sequenceIdError, setSequenceIdError ] = useState( '' );

    const sequenceIdRef = useRef();
    const nameRef = useRef();
    const speakerRef = useRef();
    const durationRef = useRef();
    const levelRef = useRef();
    const abstractRef = useRef();

    const getValues = () => {
        return {
            sequenceId: sequenceIdRef.current.value.trim(),
            name: nameRef.current.value.trim(),
            speaker: speakerRef.current.value.trim(),
            duration: durationRef.current.value.trim(),
            level: levelRef.current.value.trim(),
            abstract: abstractRef.current.value.trim()
        };
    };

    const validate = () => {
        const values = getValues();

        const numPat = /^\d+$/;
        if( values.sequenceId === '' ) {
            setSequenceIdError( 'Sequence ID is required' );
        } else if( !numPat.test( values.sequenceId ) ) {
            setSequenceIdError( 'SequenceID should be a positive integer' );
        } else {
            setSequenceIdError( '' );

            return true; // ideally if every input is valid, we should return true
        }
    };

    const addSession = async ( event ) => {
        event.preventDefault(); // prevents form submission by browser

        if( validate() ) {
            const values = getValues();

            try {
                const updatedSession = await postSession({
                    ...values,
                    workshopId: id,
                    upvoteCount: 0
                });
                toast.success( 'A new session has been created' );
            } catch( error ) {
                toast.error( error.message );
            }
        }
    };

    return (
        <>
            <h2>
                Add a session
                <Button
                    variant="danger"
                    className="float-end"
                    as={Link}
                    to={`/workshops/${id}`}
                >
                    List of sessions
                </Button>
            </h2>
            <hr />
            <Form onSubmit={addSession}>
                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Sequence ID"
                        ref={sequenceIdRef}
                        isInvalid={sequenceIdError !== ''}
                    />
                    <Form.Text className="text-muted">
                        Positive integer (numbering of the topic)
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {sequenceIdError}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name of the session" ref={nameRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" ref={speakerRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder="2.5" ref={durationRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Default select example" ref={levelRef}>
                        <option value="">-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" ref={abstractRef} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a session
                </Button>
            </Form>
        </>
    );
};
 
export default AddSession;
