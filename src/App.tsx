import { useRoutes } from 'react-router-dom'
import appRoutes from './routes/user'
import adminRoutes from './routes/admin'

const App = () => {
  const routing = useRoutes([...appRoutes, ...adminRoutes])

  return (
    <>
      
      <main>
        {routing}
      </main>
   
    </>
  )
}

export default App