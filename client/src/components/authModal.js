import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const AuthModal = ({ setShowModal }) => {
  const [show, setShow] = useState(true)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleClose = () => {
    setShow(false)
    setShowModal(false)
  }

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            { isSignUp ? <>Sign Up</> : <>Sign In</> }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={event => onSubmit(event)}>
          <Form.Group className="mb-4 mt-2" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>

          { isSignUp && 
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
          }
          
          <div className="d-flex justify-content-center small text-warning mb-4">
            { isSignUp && <button className="text-button" onClick={toggleSignUp}>Already have an account? Sign in instead</button> }
            { !isSignUp && <button className="text-button" onClick={toggleSignUp}>Need an account? Sign up instead</button> }
          </div>         
          <hr />
          
          <Button variant="warning" type="submit" className="float-end">
            Submit
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthModal
