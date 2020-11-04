import './BlueButton.css';

const BlueButton = (props) => {
  return (
    <button className="bn632-hover bn26" onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default BlueButton;
