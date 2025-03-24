import React from 'react';
import OriginalUserAvatar from 'react-native-user-avatar';

/**
 * Componente UserAvatar personalizado que envolve o react-native-user-avatar
 * usando parâmetros padrão do JavaScript em vez de defaultProps
 */
import PropTypes from 'prop-types';

const UserAvatar = ({
  size = 32,
  textColor = '#fff',
  name = 'John Doe',
  bgColors = [
    '#2ecc71', // emerald
    '#3498db', // peter river
    '#8e44ad', // wisteria
    '#e67e22', // carrot
    '#e74c3c', // alizarin
    '#1abc9c', // turquoise
    '#2c3e50', // midnight blue
  ],
  ...props
}) => {
  return (
    <OriginalUserAvatar
      size={size}
      textColor={textColor}
      name={name}
      bgColors={bgColors}
      {...props}
    />
  );
};

UserAvatar.propTypes = {
  size: PropTypes.number,
  textColor: PropTypes.string,
  name: PropTypes.string,
  bgColors: PropTypes.arrayOf(PropTypes.string),
  props: PropTypes.object
};

export default UserAvatar;