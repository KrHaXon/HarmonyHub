import React from 'react';

const MainPage = () => {
  return (
    <main className="main-page" style={styles.container}>
      <h1 style={styles.heading}>Witaj na stronie głównej!</h1>
      <p style={styles.paragraph}>
        To jest przykładowa strona główna stworzona w React. Możesz edytować ten komponent i dodać więcej treści.
      </p>
      <button style={styles.button} onClick={() => alert('Kliknięto!')}>
        Kliknij mnie
      </button>
    </main>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
  },
};

export default MainPage;