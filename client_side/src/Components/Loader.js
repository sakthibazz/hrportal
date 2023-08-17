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
          width: '100px',
          height: '100px',
        }}
      ></Spinner>
    </div>
  );
};

export default Loader;
