export default function decodeJwt(token: string): Object {
  return JSON.parse(window.atob(token.split(".")[1]));
}
