import React, { useState } from 'react';
import QuestionStep from '../QuestionStep/QuestionStep';
import FinalStep from '../FinalStep/FinalStep';
import './MultiStepForm.css';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    'type_modele': '',
    'achat_ou_leasing': '',
    'vehicule_neuf_ou_location': '',
    'duree_leasing': '',
    'nom': '',
    'prenom': '',
    'ville': '',
    'telephone': ''
  });


  const handlePostalCodeChange = (event) => {
    const postalCode = event.target.value;

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setFormData(prevState => ({
            ...prevState,
            'ville': data[0].nom
          }));
        } else {
          console.error('No city found for this postal code');
        }
      })
      .catch(error => console.error('Erreur:', error));
  };

  /* const handlePostalCodeChange = (event) => {
    const postalCode = event.target.value;
  
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const cityName = data[0].nom;
          const confirmation = window.confirm(`La ville pour ce code postal est ${cityName}. Voulez-vous l'utiliser ?`);
          if (confirmation) {
            setFormData(prevState => ({
              ...prevState,
              'ville': cityName
            }));
          }
        } else {
          console.error('No city found for this postal code');
        }
      })
      .catch(error => console.error('Erreur:', error));
  }; */
  
  const questions = {
    initial: [
      {
        question: 'Quel est le type de modèle que vous souhaitez tester?',
        name: 'type_modele',
        type: 'radio',
        options: ['COMPACTE', 'SUV', 'ELECTRIQUE & HYBIDE', 'SPORTIVE']
      },
      {
        question: 'Êtes-vous interessé par?',
        name: 'achat_ou_leasing',
        type: 'radio',
        options: ['UN ACHAT', 'UN LEASING']
      }
    ],
    achat: [
      {
        question: 'Pour quel type de vehicule?',
        name: 'vehicule_neuf_ou_location',
        type: 'radio',
        options: ['NEUF', 'OCCASION']
      }
    ],
    leasing: [
      {
        question: 'Pour quelle durée?',
        name: 'duree_leasing',
        type: 'radio',
        options: ['6 mois', '12 mois', '18 mois', '24 mois']
      }
    ],
    contact: [
      { question: 'Nom', name: 'nom', type: 'text' },
      { question: 'Prénom', name: 'prenom', type: 'text' },
      { question: 'Code Postal', name: 'postalCode', type: 'text' },
      { question: 'Numéro de téléphone', name: 'telephone', type: 'tel' }
    ]
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === 'duree_leasing') {
      formattedValue = value.replace(' mois', 'M');
    }
    if (name === 'telephone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length === 9 && numericValue[0] !== '0') {
        formattedValue = '+33' + numericValue;
      } else if (numericValue.length === 10 && numericValue[0] === '0') {
        formattedValue = '+33' + numericValue.substring(1);
      } else {
        formattedValue = numericValue;
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
    setErrorMessage('');
  };

  const handleNext = () => {
    const currentQuestion = getCurrentQuestion();
    if (formData[currentQuestion.name] === '') {
      setErrorMessage('Veuillez sélectionner une option');
    } else {
      setErrorMessage('');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentQuestion = () => {
    if (currentStep < questions.initial.length) {
      return questions.initial[currentStep];
    }

    const nextStep = currentStep - questions.initial.length;
    if (formData.achat_ou_leasing === 'UN ACHAT') {
      if (nextStep < questions.achat.length) {
        return questions.achat[nextStep];
      }
    } else if (formData.achat_ou_leasing === 'UN LEASING') {
      if (nextStep < questions.leasing.length) {
        return questions.leasing[nextStep];
      }
    }

    const finalStep = nextStep - Math.max(questions.achat.length, questions.leasing.length);
    return questions.contact[finalStep];
  };

  const renderCurrentStep = () => {
    const currentQuestion = getCurrentQuestion();

    if (currentStep < questions.initial.length ||
        (formData.achat_ou_leasing === 'UN ACHAT' && currentStep < questions.initial.length + questions.achat.length) ||
        (formData.achat_ou_leasing === 'UN LEASING' && currentStep < questions.initial.length + questions.leasing.length)) {
      return (
        <QuestionStep
          question={currentQuestion.question}
          name={currentQuestion.name}
          type={currentQuestion.type}
          options={currentQuestion.options}
          formData={formData}
          handleChange={handleChange}
          errorMessage={errorMessage}
        />
      );
    } else {
      return (
        <FinalStep
          formData={formData}
          handleChange={handleChange}
          handlePostalCodeChange={handlePostalCodeChange}
        />
      );
    }
  };

  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

	console.log(formData);
    const apiUrl = 'https://hooks.zapier.com/hooks/catch/6844401/3sjq5ou/?em=test@hipto.com';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: formData })
      });
      if (response.ok) {
        setMessage('Votre réservation a bien été prise en compte.\nVous serez contacté dans un délai de 48H.');
      } else {
        setMessage('Échec de la soumission du formulaire.');
      }
    } catch (error) {
      setMessage('Erreur lors de la soumission du formulaire.');
    }
  };

  return (
    <div className='form'>
      <form className='' onSubmit={handleSubmit}>
        {renderCurrentStep()}
        <div>
          {currentStep > 0 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {currentStep < questions.initial.length + Math.max(questions.achat.length, questions.leasing.length) ? (
            <button type="button" onClick={handleNext}>Next</button>
          ) : (
            <button type="submit">CONTINUER</button>
          )}
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MultiStepForm;
