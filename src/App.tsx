import { useState } from 'react';
import './App.css';
import { ThemeContext } from './context/theme/theme';
import Home from './pages/home/home';
import Switch from "react-switch";
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);

  const changeHandler = (check:boolean)=>{
    setChecked(!checked);
    if(check){
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  return (
    <ThemeContext.Provider value={theme}>
      <Switch onChange={changeHandler} 
      checked={checked} 
      className='react-switch' 
      checkedIcon={<FaSun size={23} color='orange' style={{paddingTop: '2px'}}></FaSun>} 
      uncheckedIcon={<FaMoon size={23} color='white' style={{paddingTop: '2px'}}></FaMoon>}
      onColor='#ddd' 
      offColor='#333' 
      onHandleColor='#333' 
      offHandleColor='#ddd'
      />
      <Home></Home>
    </ThemeContext.Provider>
  );
}

export default App;
