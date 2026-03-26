import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      })
      if (error) setError(error.message)
      else navigate('/dashboard')
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) setError(error.message)
      else navigate('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>{mode === 'login' ? 'Sign In' : 'Sign Up'}</h1>

      {mode === 'signup' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>

      <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login'
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </button>
    </div>
  )
}