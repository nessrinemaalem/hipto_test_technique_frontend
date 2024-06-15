import React from 'react';

function QuestionStep({ question, name, type, options, formData, handleChange, errorMessage }) {
  return (
    <div>
      <label>{question}</label>
      {type === 'radio' ? (
        options.map((option, index) => (
          <div key={index} className={formData[name] === option ? 'option-selected' : ''}>
            <label>
              <input
                className="radio-button"
                type={type}
                name={name}
                value={option}
                checked={formData[name] === option}
                onChange={handleChange}
              />
              {option}
            </label>
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
