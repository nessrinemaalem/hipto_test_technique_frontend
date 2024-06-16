import './App.css';
import Header from './components/Header/Header';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Header />
        <main >
        <div className='titre'>
          <h1>DE NOUVELLES ÉMOTIONS COMMENCENT ICI</h1>
          <p>Réservez un essai gratuitement en remplissant le formulaire et faites
        connaissance avec l’univers Alfa Romeo.</p>
        </div>
          <MultiStepForm />
        </main>
      <Footer />
    </div>
  );
}

export default App;
