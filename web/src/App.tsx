function App() {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center pb-16 md:pb-24 bg-black antialiased">
      <h1 className="font-satoshi text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
        Sokołek Studio
      </h1>
      
      <a
        href="mailto:hello@sokolek.com"
        className="font-inter mt-6 text-lg text-white sm:text-xl relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
      >
        hello@sokolek.com
      </a>

      <div className="absolute top-6 left-6 md:top-8 md:left-8 font-inter text-xs text-white/30 tracking-widest uppercase select-none">
        Wkrótce
      </div>
    </main>
  )
}

export default App
