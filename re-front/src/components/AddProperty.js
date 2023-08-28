import { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormModal from './FormModal'

export default function AddProperty({sendAlert}) {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    
    const handleShow = () => setShow(true)
    
    return (
        <>
            <Button variant="success" size='lg' onClick={handleShow}>
                Add a Property
            </Button>

            <FormModal show={show} setShow={setShow} sendAlert={sendAlert} handleClose={handleClose}/>
        </>
    )
  }