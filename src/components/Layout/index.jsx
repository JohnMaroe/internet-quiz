import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

function IndexPage({
  twitterHandle, description, currentURL, previewImage, siteName, pageTitle,
}) {
  return (
    <Head>
      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

      {/* Open Graph */}
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </Head>
  );
}

IndexPage.propTypes = {
  twitterHandle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currentURL: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default IndexPage;
