import React from 'react';

const Answer = ({answer}) => (
  <div className='section-answer'>
    <div><strong>A: </strong>{answer.body}</div>
    <div>
      <span>by {answer.answerer_name}, </span>
      <span>{(new Date(answer.date).toDateString())}</span> |
      <span> Helpful? <a href="#">Yes</a> ({answer.helpfulness})</span> |
      <span><a href="#"> Report</a></span>
    </div>
  </div>
)

export default Answer;