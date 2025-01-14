
function App() {
  

  return (
    <div className=" m-0 bg-gradient-to-br from-zinc-700 to-zinc-900 h-screen w-screen">
      <h1 className="text-center mx-auto pt-10 bg-gradient-to-r from-slate-50 to-slate-100 bg-clip-text text-transparent font-semibold text-4xl">Weather Check</h1>

      <div className="w-2/4 mx-auto mt-10">
        <input className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Check weather..."/>
      </div>
    </div>
  )
}

export default App
