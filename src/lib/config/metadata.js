export const defaultMetadata = {
  title: 'Mirai Studio - Color Trend Predictions',
  description: 'Mirai is a Berlin-based trend studio specializing in color trend predictions serving 13 different industries. Using cutting-edge technology to predict color trends years ahead.',
  keywords: 'color trends, trend prediction, fashion colors, automotive colors, interior design colors, trend forecasting, Berlin studio',
  url: 'https://mirai-studio.com',
  image: '/images/mirai-og-image.jpg', // Make sure to create and add this image
};

export const getMetadata = (page) => {
  const metadata = {
    '/': {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
    },
    '/forecast': {
      title: 'Start Your Color Forecast - Mirai Studio',
      description: 'Get personalized color trend predictions for your industry. Plan your production ahead with precise color forecasting.',
    },
    '/about': {
      title: 'About Mirai Studio - Color Trend Experts',
      description: 'Learn about Mirai Studio\'s innovative approach to color trend prediction and our mission to revolutionize industry planning.',
    },
    '/contact': {
      title: 'Contact Mirai Studio - Get in Touch',
      description: 'Contact Mirai Studio for color trend predictions and consulting. We\'re here to help you stay ahead of color trends.',
    },
  };

  return {
    ...defaultMetadata,
    ...metadata[page],
  };
}; 