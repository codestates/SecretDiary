const {
  NODE_ENV,
  REACT_APP_API_DOMAIN,
  REACT_APP_EC2_HTTP,
  // REACT_APP_EC2_HTTPS,
} = process.env;
export const url =
  NODE_ENV === 'development' ? REACT_APP_EC2_HTTP : REACT_APP_API_DOMAIN;
