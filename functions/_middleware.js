export async function onRequest({ request, next }) {
  const authorization = request.headers.get('Authorization');
  
  if (!authorization) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      }
    });
  }
  
  const [scheme, encoded] = authorization.split(' ');
  
  if (!encoded || scheme !== 'Basic') {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      }
    });
  }
  
  const credentials = atob(encoded).split(':');
  const username = credentials[0];
  const password = credentials[1];
  
  if (username !== 'develop' || password !== 'password') {
    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"'
      }
    });
  }
  
  return next();
}