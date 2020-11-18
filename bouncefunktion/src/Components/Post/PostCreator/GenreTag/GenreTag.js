import './GenreTag.css';

const GenreTag = (props) => {
  return (
    <div className="messageSender__tags">
      <button
        className={
          props.genreSelected
            ? 'messageSender__buttonClicked'
            : 'messageSender__buttonNotClicked'
        }
        onClick={props.clicked}
      >
        {props.genre}
      </button>
    </div>
  );
};

export default GenreTag;
