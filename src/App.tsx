import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { CreateTournament } from './pages/CreateTournament'
import { TournamentView } from './pages/TournamentView'
import { TournamentManage } from './pages/TournamentManage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournaments/create"
        element={
          <ProtectedRoute>
            <CreateTournament />
          </ProtectedRoute>
        }
      />
      <Route path="/tournaments/:id" element={<TournamentView />} />
      <Route
        path="/tournaments/:id/manage"
        element={
          <ProtectedRoute>
            <TournamentManage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}