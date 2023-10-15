import './App.css'
import { Route, Routes, Link, NavLink, useParams, Outlet } from 'react-router-dom';


// views examples
const Home = () => {return (<h1>Home</h1>)};
const Portfolio = () => {return(<h1>Portfolio</h1>)};
const Academy = () => {return(<h1>Academy</h1>)};

// Coins component
const Coins = () => {
  // La función 'useParams' retorna un objeto con el valor del segmento de url dinámico '/:coinName' en este ejemplo.
  const {coinName} = useParams();

  // Se podría capturar el id del objeto a renderizar para consultar los datos en db
  return(
    <>
    <h1>Cryptocurrency</h1>
    <hr />
    <h3>{coinName}</h3>
    <Link to='details'>Go to details</Link>
    {/* Outlet representa el lugar donde se renderizan los elementos de las rutas anidadas, 'CoinDetails' en este ejemplo */}
    <Outlet />
    </>
  )
};

// CoinDetails component
const CoinDetails = () =>{
  const {coinName} = useParams();

  return(
    <>
    <h2>Coin details: {coinName}</h2>
    </>
  )
}

// SearchPage component
const SearchPage = () => {
  var coins = ['bitcoin','ehtereum','polkadot','cardano','solana'];

  return (
    <section>
      <h1>Search Page</h1>
      <ul>
        {coins.map((coin,index) => {
          return(<li key={index}><Link to={`/coins/${coin}`}>{coin}</Link></li>);
        })}
      </ul>
    </section>
  )
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = useAuth()
}

function App() {

  return (
      <main className="App">
        <header>
          <h1>Material Byte</h1>
          <nav>
            <ul>
              {/* Utilizar componente 'NavLink' para los enlaces */}
              <li><NavLink className={({ isActive }) => { return isActive ? 'cssActiveClass' : undefined }} to="/">Home</NavLink></li>
              <li><NavLink className={({ isActive }) => { return isActive ? 'cssActiveClass' : undefined }} to="/portfolio">Portfolio</NavLink></li>
              <li><NavLink className={({ isActive }) => { return isActive ? 'cssActiveClass' : undefined }} to="/academy">Academy</NavLink></li>
              <li><NavLink className={({ isActive }) => { return isActive ? 'cssActiveClass' : undefined }} to="/search-page">Search page</NavLink></li>
            </ul>
          </nav>
        </header>

        {/* Definir en App las rutas disponibles dentro de Routes */}
        <Routes>
          {/* Valor de atributo element es elemento no componente */}
          <Route path='/' element={<Home />} />
          
          {/* Ruta protegida por autenticación - ProtectedRoute && useAuth */}
          <Route path='/portfolio' element={ <ProtectedRoute><Portfolio /></ProtectedRoute> }/>

          <Route path='/academy' element={<Academy />} />
          
          <Route path='/search-page' element={<SearchPage />} />
          
          {/* Ruta con valor dinámico, extraer valor desde componente utilizando 'useParams()' */}
          <Route path='/coins/:coinName' element={<Coins />}>
            {/* Ruta relativa anidada, sin slash, utilizar componente 'Outlet' en componente padre para indicar donde renderizar elementos anidados */}
            <Route path='details' element={<CoinDetails />} />
          </Route>
          
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
  )
}

export default App
