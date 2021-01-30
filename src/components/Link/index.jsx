import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

export default function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
