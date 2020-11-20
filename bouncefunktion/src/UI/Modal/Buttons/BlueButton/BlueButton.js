import './BlueButton.css';

const BlueButton = (props) => {
  return (
    <button
      style={props.style}
      className="bn632-hover bn26"
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default BlueButton;
