import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { postSession } from '../../services/sessions';
import { useForm } from 'react-hook-form';

const AddSession = ({ id }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all'
    });

    console.log( errors );

    const addSession = async ( values ) => {
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
    };

    // const props = {
    //     type: "number",
    //     placeholder: "Sequence ID"
    // };

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
            <Form onSubmit={handleSubmit(addSession)}>
                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    {/* {...props} -> props spread */}
                    <Form.Control
                        type="number"
                        placeholder="Sequence ID"
                        {...register( 'sequenceId', { required: true, min: 1 } )}
                        isInvalid={errors.sequenceId}
                    />
                    <Form.Text className="text-muted">
                        Positive integer (numbering of the topic)
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.sequenceId?.type === 'required' && (
                                <div>Sequence ID is required</div>
                            )
                        }
                        {
                            errors.sequenceId?.type === 'min' && (
                                <div>Sequence ID should be a positive number</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session"
                        {...register( 'name', { required: true } )}
                        isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.name?.type === 'required' && (
                                <div>Name is required</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="John Doe"
                        {...register( 'speaker', { required: true, pattern: /[A-Za-z ]+/ } )}isInvalid={errors.speaker}
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.speaker?.type === 'required' && (
                                <div>Speaker name is required</div>
                            )
                        }
                        {
                            errors.speaker?.type === 'pattern' && (
                                <div>This is not an acceptable name</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="2.5"
                        {...register( 'duration', { required: true, min: 0 })}
                        isInvalid={errors.duration}
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.duration?.type === 'required' && (
                                <div>Duration is required</div>
                            )
                        }
                        {
                            errors.duration?.type === 'min' && (
                                <div>Duration should be a positive number</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        {...register( 'level', { required: true })}
                        isInvalid={errors.level}
                    >
                        <option value="">-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.level?.type === 'required' && (
                                <div>Level is required</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...register( 'abstract', { required: true, minLength: 10 })}
                        isInvalid={errors.abstract}
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            errors.abstract?.type === 'required' && (
                                <div>Abstract is required</div>
                            )
                        }
                        {
                            errors.abstract?.type === 'minLength' && (
                                <div>Please provide at least 10 characters</div>
                            )
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={Object.keys( errors ).length !== 0}>
                    Add a session
                </Button>
            </Form>
        </>
    );
};

export default AddSession;