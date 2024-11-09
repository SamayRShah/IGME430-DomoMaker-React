// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

const handleLogin = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;

  if (!username || !pass) {
    helper.handleError('Username or password is empty!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;
  const pass2 = e.target.querySelector('#pass2').value;

  if (!username || !pass || !pass2) {
    helper.handleError('All fields are required!');
    return false;
  }

  if (pass !== pass2) {
    helper.handleError('Passwords do not match');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, pass2 });
  return false;
};

const LoginWindow = () => (
  <form
    id="loginForm"
    name="loginForm"
    onSubmit={handleLogin}
    action="/login"
    method="POST"
    className="mainForm"
  >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username" />
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password" />
    <input className="formSubmit" type="submit" value="Sign in" />
  </form>
);

const SignupWindow = () => (
  <form
    id="signupForm"
    name="signupForm"
    onSubmit={handleSignup}
    action="/signup"
    method="POST"
    className="mainForm"
  >
    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username" />
    <label htmlFor="pass">Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password" />
    <label htmlFor="pass2">Password: </label>
    <input
      id="pass2"
      type="password"
      name="pass2"
      placeholder="re-type password"
    />
    <input className="formSubmit" type="submit" value="Sign in" />
  </form>
);

const init = () => {
  const loginBtn = document.querySelector('#loginButton');
  const signupBtn = document.querySelector('#signupButton');

  const root = createRoot(document.querySelector('#content'));

  loginBtn.onclick = (e) => {
    e.preventDefault();
    root.render(<LoginWindow />);
    return false;
  };

  signupBtn.onclick = (e) => {
    e.preventDefault();
    root.render(<SignupWindow />);
    return false;
  };

  root.render(<LoginWindow />);
};

window.onload = init;
