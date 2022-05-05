import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ text, onClick }) {
  return (
    <button className={s.button} type="submit" onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
