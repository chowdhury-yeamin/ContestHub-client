import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    // Set theme immediately on mount
    const html = document.documentElement;
    html.setAttribute('data-theme', initialTheme);
    document.body.setAttribute('data-theme', initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Force update immediately - DaisyUI uses data-theme attribute
      const html = document.documentElement;
      const body = document.body;
      
      // Remove old theme
      html.removeAttribute('data-theme');
      body.removeAttribute('data-theme');
      
      // Force reflow
      void html.offsetHeight;
      
      // Set new theme
      html.setAttribute('data-theme', newTheme);
      body.setAttribute('data-theme', newTheme);
      
      // Force another reflow to ensure CSS updates
      void html.offsetHeight;
      
      console.log('Theme changed to:', newTheme);
      console.log('HTML data-theme:', html.getAttribute('data-theme'));
      console.log('Body data-theme:', body.getAttribute('data-theme'));
      
      // Check CSS variables
      const computedStyle = getComputedStyle(html);
      console.log('--b1 (background):', computedStyle.getPropertyValue('--b1'));
      console.log('--bc (text):', computedStyle.getPropertyValue('--bc'));
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

