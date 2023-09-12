import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Make the loader cover the entire viewport height
      }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="info" // Change the color of the spinner to info color (blue)
        style={{
       
          height: '100px',
          borderWidth: '8px', // Increase the thickness of the spinner border
          borderColor: 'purple', // Change the color of the spinner border
          borderRadius: '50%', // Make the spinner circular
        }}
      ></Spinner>
    </div>
  );
};

export default Loader;