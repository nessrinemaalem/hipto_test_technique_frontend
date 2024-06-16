import React from 'react';
import './QuestionStep.css';

  function QuestionStep({ question, name, type, options, formData, handleChange, errorMessage }) {
	return (
	  <div className='questions'>
		<label className='question'>{question}</label>
		{type === 'radio' ? (
		  options.map((option, index) => (
			<div key={index} className={formData[name] === option.replace(' mois', 'M') ? 'option-selected' : ''}>
			<input
				className="radio-button"
				type={type}
				name={name}
				value={option}
				checked={formData[name] === option.replace(' mois', 'M')}
				onChange={handleChange}
				id={`${name}-${index}`}
			/>
			<label className='option' htmlFor={`${name}-${index}`}>{option}</label>
			</div>

		  ))
		) : (
		  <input
			type={type}
			name={name}
			value={formData[name]}
			onChange={handleChange}
		  />
		)}
		{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
	  </div>
	);
  }
  
export default QuestionStep;
