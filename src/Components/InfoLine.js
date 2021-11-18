import React from 'react'

function InfoLine({ item, info, isValid, invalidMsg, emptyMsg }) {
  return (
    <div>
      {item}: {info}
      <div className='err'>
        {info && !isValid && invalidMsg}
        {!info && emptyMsg}
      </div>

    </div>
  )
}

export default InfoLine
