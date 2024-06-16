import React from 'react';
import './FinalStep.css';

function FinalStep({ formData, handleChange, handlePostalCodeChange }) {
  return (
	<div>
	  <h2>Vos coordonées :</h2>
	  <div className='final-step'>
  <div className='grid'>
    <label htmlFor='prenom'>PRENOM</label>
    <input type='text' id='prenom' name='prenom' placeholder='Ecrire' value={formData.prenom} onChange={handleChange} />
  </div>
  <div className='grid'>
    <label htmlFor='nom'>NOM</label>
    <input type='text' id='nom' name='nom' placeholder='Ecrire' value={formData.nom} onChange={handleChange} />
  </div>
  <div className='grid'>
    <label htmlFor='telephone'>TELEPHONE</label>
    <input type='tel' id='telephone' name='telephone' placeholder='06 XX XX XX XX' value={formData.telephone} onChange={handleChange} required />
  </div>
  <div className='grid'>
    <label htmlFor='postalCode'>CODE POSTAL</label>
    <input type='text' id='postalCode' name='postalCode' placeholder='75008' onChange={handlePostalCodeChange} pattern='[0-9]{5}' required />
  </div>
</div>
	</div>

  );
}

export default FinalStep;
