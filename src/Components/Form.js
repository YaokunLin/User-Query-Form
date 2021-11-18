import React, { useReducer, useEffect, useState } from 'react'


import Modal from 'react-modal'
import ModalCSS from './FormItems/ModalCSS'
import UserList from './UserList';
import InfoLine from './InfoLine'




const initState = {
  firstName: "",
  firstNameValid: true,

  lastName: "",
  lastNameValid: true,

  phone: "",
  phoneValid: true,

  email: "",
  emailValid: true,

  allValid: false,

  query: "",
  modalIsOpen: false,

  updateUserList: 0

}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'inputFirstName': return { ...state, firstName: action.payload, firstNameValid: true }
    case 'checkFirstName': return { ...state, firstNameValid: action.payload }

    case 'inputLastName': return { ...state, lastName: action.payload, lastNameValid: true }
    case 'checkLastName': return { ...state, lastNameValid: action.payload }

    case 'inputPhone': return { ...state, phone: action.payload, phoneValid: true }
    case 'checkPhone': return { ...state, phoneValid: action.payload }

    case 'inputEmail': return { ...state, email: action.payload, emailValid: true }
    case 'checkEmail': return { ...state, emailValid: action.payload }

    case 'inputQuery': return { ...state, query: action.payload }
    case 'submitQuery': return { ...state, modalIsOpen: action.payload }
    case 'switchModal': return { ...state, modalIsOpen: action.payload }

    case 'checkAll': return { ...state, allValid: action.payload }

    case 'updateList': return { ...state, updateUserList: state.updateUserList + 1 }
    default: return state
  }
}




function Form() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [userState, userDispacth] = useReducer(userReducer, initState)

  const handleReducerTextInput = (event, inputType) => {
    event.preventDefault()
    userDispacth({ type: inputType, payload: event.target.value })
  }

  const handleReducerSubmit = (event, inputType) => {
    event.preventDefault()
    userDispacth({ type: inputType, payload: true })
  }

  const closeModal = () => userDispacth({ type: 'switchModal', payload: false })


  const validateInputs = () => {
    let validAll = true

    if (! /^[a-zA-Z]+$/.test(userState.firstName)) {
      userDispacth({ type: 'checkFirstName', payload: false })
      validAll = false
    }

    if (! /^[a-zA-Z]+$/.test(userState.lastName)) {
      userDispacth({ type: 'checkLastName', payload: false })
      validAll = false
    }

    if (! /^(\d|\(|\)|-)+$/.test(userState.phone)) {
      userDispacth({ type: 'checkPhone', payload: false })
      validAll = false
    }

    const emailArry = userState.email.split('@')
    const beforeAt = emailArry[0]
    const afterAt = emailArry[1]

    if (!beforeAt || ! /^(\w|\.)+$/.test(beforeAt) || !afterAt || !/^([a-zA-Z_]|\.)+$/.test(afterAt)) {
      userDispacth({ type: 'checkEmail', payload: false })
      validAll = false
    }

    if (validAll && userState.firstName && userState.lastName && userState.phone && userState.email && userState.query) {
      userDispacth({ type: 'checkAll', payload: true })
    } else {
      userDispacth({ type: 'checkAll', payload: false })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      firstName: userState.firstName,
      lastName: userState.lastName,
      phone: userState.phone,
      email: userState.email,
      query: userState.query,
    }

    fetch('http://localhost:8000/userInfo', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    }).then(() => {
      console.log('new record added');
    })

    userDispacth({ type: 'updateList' })

  }




  return (
    <div>
      <div className='input-form-div'>
        <form onSubmit={(e) => { handleReducerSubmit(e, 'submitQuery') }}>
          First Name:<br />
          <input type='text' onChange={(e) => { handleReducerTextInput(e, 'inputFirstName') }}></input>
          <br /><br />
          Last Name:<br />
          <input type='text' onChange={(e) => { handleReducerTextInput(e, 'inputLastName') }}></input>
          <br /><br />
          Phone:<br />
          <input type='text' onChange={(e) => { handleReducerTextInput(e, 'inputPhone') }}></input>
          <br /><br />
          Email:<br />
          <input type='text' onChange={(e) => { handleReducerTextInput(e, 'inputEmail') }}></input>
          <br /><br />

          Query:<br />
          <div style={{ textAlign: 'center' }}>
            <textarea rows="4" cols="50" maxLength="1000"
              onChange={(e) => { handleReducerTextInput(e, 'inputQuery') }}></textarea>
            <br />
            {userState.query.length}/1000
          </div>

          <br />
          <button type='submit' onClick={validateInputs} > Submit </button>

        </form>





        <Modal
          ariaHideApp={false}
          isOpen={userState.modalIsOpen}
          onRequestClose={closeModal}
          style={ModalCSS}>

          <div
            style={{
              position: "absolute",
              top: "30px",
              right: "70px",
              cursor: 'pointer'
            }}
            onClick={closeModal}>
            ❌
          </div>

          <h2> Query: </h2>
          <div>


            <InfoLine
              item="First Name"
              info={userState.firstName}
              isValid={userState.firstNameValid}
              invalidMsg=' Name Can Only Accept Letters'
              emptyMsg='Please Enter a First Name'
            />




            <InfoLine
              item="Last Name"
              info={userState.lastName}
              isValid={userState.lastNameValid}
              invalidMsg=' Name Can Only Accept Letters'
              emptyMsg='Please Enter a Last Name'
            />



            <InfoLine
              item="Phone"
              info={userState.phone}
              isValid={userState.phoneValid}
              invalidMsg=' Phone Number Can Only Accept Numbers Dashes and Parenthesis'
              emptyMsg='Please Enter a Phone Number'
            />



            <InfoLine
              item="Email"
              info={userState.email}
              isValid={userState.emailValid}
              invalidMsg=' Email Address Not Valid'
              emptyMsg='Please Enter an Email Address'
            />

            <div>
              Query: {userState.query}
              <div className='err'>
                {!userState.query && 'Please Enter a Query'}
              </div>

            </div>

          </div>

          <div>
            <button onClick={handleSubmit}
              disabled={!userState.allValid}>
              Submit</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </Modal>

      </div>

      <UserList trigger={userState.updateUserList} />

    </div>
  )
}

export default Form
