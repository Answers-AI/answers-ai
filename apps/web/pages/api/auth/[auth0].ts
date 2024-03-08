import auth0 from '@utils/auth/auth0';

// Use the instance method
export default auth0.handleAuth({
  login: auth0.handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      // Add the `offline_access` scope to also get a Refresh Token
      scope: process.env.AUTH0_SCOPE
    }
  })
});
