import './testGlitchText.css';

const GlitchText = (props) => {
  return (
    <div className="glitch__container">
      <p className="glitch">
        <span aria-hidden={true}>{props.glitchText}</span>
        {props.glitchText}
        <span aria-hidden={true}>{props.glitchText}</span>
        <b className="glitch__secondaryText">{props.secondaryText}</b>
      </p>
    </div>
  );
};

export default GlitchText;
