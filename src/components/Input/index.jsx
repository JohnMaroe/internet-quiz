import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
  width: 240px;
  padding: 11px;
  font-size: 14px;
  font-weight: 900;
  outline: 0;
  margin-bottom: 25px;

  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

function Input({ placeholder, onChange, value }) {
  return (
    <div>
      <InputBase placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Input;
