import './App.css';
import {Outlet} from 'react-router-dom';

// const Title = ({ text }: {text:string}) => {
//   return <h1>{text}</h1>
// }

function App() {

  return (
    <div className='App'>
      {/* <Title text='Boa noite, meu nobre' /> */}
      <Outlet  />
    </div>
  )
}

export default App
