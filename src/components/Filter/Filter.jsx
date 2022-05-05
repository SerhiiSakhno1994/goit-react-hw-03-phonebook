import PropTypes from 'prop-types';

import s from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <div className={s.container}>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={value}
          placeholder="Name"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
