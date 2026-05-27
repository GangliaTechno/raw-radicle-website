import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { asset } from '../utils/assets.js'

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
        <img src={asset('assets/RR_Logo-1.png')} alt="Raw Radicles" />
        <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
        {mode === 'register' ? <input name="name" placeholder="Name" required /> : null}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button className="rr-button rr-button-dark" type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <p>{status}</p>
        <Link to={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Create account' : 'Already have an account?'}</Link>
      </form>
    </main>
  )
}
