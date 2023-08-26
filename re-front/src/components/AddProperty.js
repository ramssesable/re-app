import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export default function AddProperty({sendAlert}) {
    const [show, setShow] = useState(false)

    const {register, handleSubmit, reset, formState: { errors }} = useForm()

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}/properties`, data)
            .then(result => {
                if (result.status === 200) {
                    reset()
                    setShow(false)
                    sendAlert()
                }
            })
            .catch(result => {
                console.log(result.response.data)
                alert(`Failed to add the property, errors: ${JSON.stringify(result.response.data.errors, null, 2)}`)
            })
    }

    const handleClose = () => {
        setShow(false)
    }
    
    const handleShow = () => setShow(true)
    
    return (
        <>
            <Button variant="success" size='lg' onClick={handleShow}>
                Add a Property
            </Button>
    
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adding a Property</Modal.Title>
                    </Modal.Header>
            
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control
                                    min={1}
                                    max={128}
                                    placeholder="Name..."
                                    {...register("name", {required: true, minLength: 1, maxLength: 128})} />
                                <Form.Text className="text-muted">{errors?.name && 'This field is required'}</Form.Text>
                            </Form.Group>
            
                            <Form.Group className="mb-3" controlId="formBasicType">
                                <Form.Select
                                    {...register('real_state_type', {required: true})}
                                >
                                    <option value={''}>Select a Type...</option>
                                    <option>house</option>
                                    <option>department</option>
                                    <option>land</option>
                                    <option>commercial_ground</option>
                                </Form.Select>
                                <Form.Text className="text-muted">{errors?.real_state_type && 'This field is required'}</Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicStreet">
                                <Form.Control
                                    min={1}
                                    max={128}
                                    placeholder="Street..."
                                    {...register('street', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.street && 'This field is required'}</Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicExternal">
                                <Form.Control
                                    min={1}
                                    max={12}
                                    placeholder="External Number..."
                                    {...register('external_number', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.external_number && 'This field is required'}</Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    min={1}
                                    max={12}
                                    type='text'
                                    placeholder="internal Number..."
                                    {...register('internal_number')}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    min={1}
                                    max={128}
                                    placeholder="Neighborhood..."
                                    {...register('neighborhood', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.neighborhood && 'This field is required'}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    min={1}
                                    max={64}
                                    placeholder="City..."
                                    {...register('city', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.city && 'This field is required'}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    min={2}
                                    max={2}
                                    placeholder="Country..."
                                    {...register('country', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.country && 'This field is required'}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    type='number'
                                    placeholder="Rooms..."
                                    {...register('rooms', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.rooms && 'This field is required'}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    type='number'
                                    step={'any'}
                                    placeholder="Bathrooms..."
                                    {...register('bathrooms', {required: true})}
                                />
                                <Form.Text className="text-muted">{errors?.bathrooms && 'This field is required'}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicinternal">
                                <Form.Control
                                    min={1}
                                    max={128}
                                    type='text'
                                    placeholder="Coments..."
                                    {...register('comments')}
                                />
                            </Form.Group>
            
                        Woohoo, you are doing this in a modal!
                    </Modal.Body>
            
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Record
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
  }