import { useAuthStore } from 'src/stores/auth/index'

export default function authHeader() {
  const auth = useAuthStore();
  const token = auth.authToken;
  const isUserLoggedIn = auth.isUserLoggedIn
  if (token && isUserLoggedIn) {
    return {
      headers: {
        'authorization': token
      }
    }
  } else {
    return {
      headers: {
        'authorization': null
      }
    }
  }
}
