import Weather from "./components/Weather"

function App() {
  

  return (
    <div className=" m-0 bg-gradient-to-br from-zinc-700 to-zinc-900 h-screen w-screen">
      <h1 className="text-center mx-auto pt-10 bg-gradient-to-r from-slate-50 to-slate-100 bg-clip-text text-transparent font-normal text-4xl">Weather Check</h1>
      <Weather />
    </div>
  )
}

export default App
