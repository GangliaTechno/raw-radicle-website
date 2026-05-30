import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle.js'

export function AuthPage({ mode }) {
  usePageTitle(mode === 'login' ? 'Login' : 'Register')
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const submit = (event) => {
    event.preventDefault()
    setStatus(mode === 'login' ? 'Signed in for this browser session.' : 'Account created for this browser session.')
    window.setTimeout(() => navigate('/admin'), 500)
  }

  return (
    <main className="rr-auth-page">
      <form className="rr-auth-card" onSubmit={submit}>
        <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>
        <p className="rr-auth-subtitle">
          {mode === 'login' ? 'Enter your email and password to login:' : 'Create your account to continue:'}
        </p>
        {mode === 'register' ? <input name="name" placeholder="Name" required /> : null}
        <input name="email" type="email" placeholder="E-mail" required />
        <div className="rr-auth-password-row">
          <input name="password" type="password" placeholder="Password" required />
          {mode === 'login' ? (
            <a className="rr-auth-forgot" href="#forgot-password">
              Forgot your password?
            </a>
          ) : null}
        </div>
        <button className="rr-button rr-button-dark" type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        {status ? <p className="rr-auth-status">{status}</p> : null}
        <Link className="rr-auth-switch" to={mode === 'login' ? '/register' : '/login'}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </Link>
      </form>
    </main>
  )
}
