import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Settings, Zap, Play, AlertTriangle, ChevronRight, Cpu, MousePointer2,
  Menu, X, Globe, Code, Home, ArrowRight, Terminal, Trash2, Pause,
  RotateCw, ArrowUp, Bluetooth, Usb, Eye, Ruler, Split, Navigation,
  ShieldCheck, Rocket
} from 'lucide-react';
import { content } from './content';
import DroneSVG from './components/DroneSVG';

const App = () => {
  // --- States ---
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('home');
  const [activeStep, setActiveStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Connection States
  const [connection, setConnection] = useState({ type: null, status: 'disconnected', deviceName: '' });
  const [isScanning, setIsScanning] = useState(false);

  // Simulation States
  const [workspace, setWorkspace] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [dronePos, setDronePos] = useState({ x: 0, y: 0, z: 0, rotate: 0, isFlying: false });
  const [sensorData, setSensorData] = useState({ tof: 0, opticalFlow: { vx: 0, vy: 0 } });

  const t = content[lang];

  // --- Connection Handler ---
  const handleConnect = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      setConnection({ type, status: 'connected', deviceName: type === 'ble' ? 'Codelift_v2_BLE' : 'Serial_Drone_Link' });
      setIsScanning(false);
    }, 1500);
  };

  // --- Simulation Engine ---
  const runProgram = async () => {
    if (workspace.length === 0 || isExecuting) return;
    setIsExecuting(true);
    for (let i = 0; i < workspace.length; i++) {
      setCurrentBlockIndex(i);
      const block = workspace[i];
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDronePos(prev => {
        let next = { ...prev };
        switch (block.id) {
          case 'takeoff': next = { ...prev, z: 60, isFlying: true }; break;
          case 'forward': next = { ...prev, y: prev.y - 40 }; break;
          case 'right': next = { ...prev, rotate: prev.rotate + 90 }; break;
          case 'land': next = { ...prev, z: 0, isFlying: false }; break;
          default: break;
        }
        setSensorData({ tof: next.z + (Math.random() * 2), opticalFlow: { vx: block.id === 'forward' ? 1.5 : 0, vy: 0 } });
        return next;
      });
    }
    setIsExecuting(false);
    setCurrentBlockIndex(-1);
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-700 ${lang === 'th' ? "font-mali" : "font-itim"}`}>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 h-24 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setView('home')}
          >
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <Navigation size={36} />
            </div>
            <div>
              <h1 className="school-title text-4xl text-blue-500 leading-none">Codelift</h1>
              <p className="text-[12px] uppercase font-bold tracking-[0.3em] text-slate-400">Academy</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-12">
            <button onClick={() => setView('home')} className={`text-xl font-medium hover:text-blue-500 transition-colors ${view === 'home' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.home}</button>
            <button onClick={() => setView('code')} className={`text-xl font-medium hover:text-blue-500 transition-colors ${view === 'code' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.code}</button>

            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
              <button onClick={() => setLang('th')} className={`px-6 py-2 rounded-xl text-sm transition-all ${lang === 'th' ? 'bg-white shadow-lg text-blue-500 font-bold' : 'text-slate-500'}`}>TH</button>
              <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-xl text-sm transition-all ${lang === 'en' ? 'bg-white shadow-lg text-blue-500 font-bold' : 'text-slate-500'}`}>EN</button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('code')}
              className="bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-blue-200 hover:bg-blue-600 transition-all"
            >
              {t.nav.code}
            </motion.button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={36} /></button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32"
          >
            {/* Hero Section */}
            <section className="pt-24 pb-32 px-6 text-center max-w-6xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-8 py-3 bg-blue-100/50 text-blue-600 rounded-full text-sm font-bold mb-10 tracking-widest uppercase backdrop-blur-sm border border-blue-200/50"
              >
                {t.hero.badge}
              </motion.div>
              <h2 className="school-title text-7xl md:text-[10rem] mb-12 text-slate-800 leading-[0.9] tracking-tight">
                {t.hero.title1} <br /> <span className="text-blue-500 drop-shadow-sm">{t.hero.title2}</span>
              </h2>
              <p className="text-2xl md:text-4xl text-slate-500 mb-20 leading-relaxed max-w-4xl mx-auto font-medium">
                {t.hero.sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('code')}
                  className="bg-blue-500 text-white px-20 py-8 rounded-[2.5rem] text-3xl font-bold shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-all"
                >
                  {t.hero.btnStart}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-4 border-slate-100 text-slate-500 px-20 py-8 rounded-[2.5rem] text-3xl font-bold hover:border-blue-400 transition-all flex items-center justify-center gap-6 shadow-xl shadow-slate-200/50"
                >
                  <Play size={40} className="fill-blue-500 text-blue-500" /> {t.hero.btnLab}
                </motion.button>
              </div>

              <div className="mt-40 flex justify-center animate-float">
                <DroneSVG isFlying={true} rotate={8} z={100} size={350} />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-40 right-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
            </section>

            {/* Features Section */}
            <section className="py-40 bg-white shadow-[0_-20px_80px_rgba(0,0,0,0.02)] rounded-[5rem]">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
                {t.features.map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -15 }}
                    className="glass-card p-16 rounded-[4rem] group"
                  >
                    <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-10 mx-auto text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-100">
                      {React.cloneElement(f.icon, { size: 48 })}
                    </div>
                    <h4 className="school-title text-4xl mb-6 text-slate-800">{f.title}</h4>
                    <p className="text-slate-400 text-xl leading-relaxed font-medium">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Journey Section */}
            <section className="py-40 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-32">
                <h3 className="school-title text-7xl mb-8 text-slate-800">{t.steps.title}</h3>
                <p className="text-slate-400 text-3xl font-medium">{t.steps.sub}</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10">
                  {t.steps.items.map(step => (
                    <motion.div
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      whileHover={{ scale: 1.02 }}
                      className={`p-12 rounded-[4rem] cursor-pointer transition-all border-4 ${activeStep === step.id ? 'bg-white border-blue-500 shadow-[0_30px_60px_rgba(0,0,0,0.08)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <div className="flex gap-12 items-center">
                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 ${activeStep === step.id ? 'bg-blue-500 text-white rotate-12' : 'bg-slate-200 text-slate-500'}`}>
                          {React.cloneElement(step.icon, { size: 48 })}
                        </div>
                        <div className="text-left">
                          <h5 className="text-4xl font-black mb-3">{step.id}. {step.title}</h5>
                          <p className="text-2xl text-slate-400 font-medium">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  layoutId="step-preview"
                  className="bg-white rounded-[6rem] p-24 shadow-2xl border-4 border-slate-50 min-h-[700px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  <motion.div
                    key={activeStep}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="text-[220px] mb-16 drop-shadow-2xl"
                  >
                    {activeStep === 1 ? '📦' : activeStep === 2 ? '🔧' : activeStep === 3 ? '⚡' : '🚀'}
                  </motion.div>
                  <h4 className="school-title text-6xl text-slate-800">{t.steps.items[activeStep - 1].title}</h4>
                  <p className="mt-10 text-2xl text-slate-400 max-w-md mx-auto leading-relaxed font-medium">{t.steps.items[activeStep - 1].desc}</p>

                  {/* Decorative background circle */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full -z-10"></div>
                </motion.div>
              </div>
            </section>
          </motion.main>
        ) : (
          /* --- DRONE LAB VIEW --- */
          <motion.main
            key="code"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-40 pb-32 px-6 max-w-[1800px] mx-auto min-h-screen"
          >
            <div className="flex flex-col xl:flex-row justify-between items-end mb-16 gap-10">
              <div className="max-w-3xl">
                <h2 className="school-title text-7xl text-slate-800">{t.blockly.title}</h2>
                <p className="text-slate-500 text-3xl mt-6 leading-relaxed font-medium">{t.blockly.sub}</p>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className={`flex items-center gap-6 px-10 py-6 rounded-[2.5rem] text-xl font-black border-4 ${connection.status === 'connected' ? 'bg-green-50 text-green-600 border-green-200 shadow-lg shadow-green-100' : 'bg-white text-slate-300 border-slate-100'}`}>
                  <Bluetooth size={32} className={connection.status === 'connected' ? "animate-pulse" : ""} />
                  {connection.status === 'connected' ? connection.deviceName : 'Offline'}
                  {connection.status === 'disconnected' && (
                    <button onClick={() => handleConnect('ble')} className="ml-6 text-blue-500 underline decoration-2 underline-offset-8 transition-all hover:text-blue-600">
                      {lang === 'th' ? "เชื่อมต่อ" : "Connect"}
                    </button>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWorkspace([])}
                  className="bg-white border-4 border-slate-100 p-8 rounded-[2.5rem] text-slate-300 hover:text-red-500 hover:border-red-100 transition-all shadow-xl shadow-slate-200/50"
                >
                  <Trash2 size={36} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runProgram}
                  disabled={isExecuting || workspace.length === 0}
                  className={`px-24 py-6 rounded-[3rem] text-white font-black text-3xl shadow-[0_25px_50px_rgba(59,130,246,0.3)] transition-all ${isExecuting || workspace.length === 0 ? 'bg-slate-300 shadow-none' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {isExecuting ? '...' : t.blockly.run}
                </motion.button>
              </div>
            </div>

            <div className="grid xl:grid-cols-12 gap-12 h-[1000px]">
              {/* TOOLBOX */}
              <div className="xl:col-span-3 bg-white rounded-[4rem] p-12 border-4 border-slate-50 shadow-2xl overflow-y-auto custom-scrollbar">
                <h3 className="text-sm uppercase font-black text-slate-300 tracking-[0.5em] mb-12 border-b-4 border-slate-50 pb-6">Inventory</h3>
                <div className="space-y-6">
                  {t.blockly.blocks.map(b => (
                    <motion.button
                      key={b.id}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWorkspace([...workspace, { ...b, i: Date.now() }])}
                      className={`w-full p-8 rounded-[2.5rem] ${b.color} text-white text-2xl font-black flex items-center gap-6 shadow-xl border-b-[12px] ${b.border} hover:-translate-y-1 transition-all`}
                    >
                      <div className="bg-white/25 p-3 rounded-2xl drop-shadow-lg">{React.cloneElement(b.icon, { size: 32 })}</div>
                      {b.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* WORKSPACE */}
              <div className="xl:col-span-5 bg-white rounded-[4rem] p-16 border-4 border-slate-50 shadow-inner overflow-y-auto relative bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:60px_60px] custom-scrollbar">
                <div className="bg-slate-800 text-white p-8 rounded-[2.5rem] w-fit flex items-center gap-6 mb-12 shadow-2xl text-3xl font-black border-4 border-slate-700 ring-[12px] ring-slate-100">
                  <div className="bg-purple-500 p-3 rounded-2xl shadow-lg"><Play size={32} fill="white" /></div>
                  {lang === 'th' ? 'เตรียมตัว...' : 'Start!'}
                </div>
                <div className="ml-16 space-y-6">
                  <AnimatePresence>
                    {workspace.map((block, i) => (
                      <motion.div
                        key={block.i}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`${block.color} text-white p-8 rounded-[3rem] w-full max-w-[500px] flex items-center justify-between shadow-2xl border-b-[10px] border-black/10 text-2xl font-black transition-all ${currentBlockIndex === i ? 'ring-[12px] ring-yellow-400 scale-105 z-10 translate-x-10 shadow-yellow-200' : ''}`}
                      >
                        <div className="flex items-center gap-6">
                          {React.cloneElement(block.icon, { size: 36 })} {block.label}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-sm">{i + 1}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {workspace.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 italic p-24 text-4xl text-center leading-relaxed font-bold opacity-40">
                    Drag blocks here to build your mission! 🚀
                  </div>
                )}
              </div>

              {/* SIMULATOR & TELEMETRY */}
              <div className="xl:col-span-4 space-y-12">
                <div className="bg-slate-900 rounded-[5rem] aspect-square shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden flex items-center justify-center border-[16px] border-slate-800">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.03)_2px,transparent_2px)] bg-[size:100px_100px]"></div>
                  <div className="z-10 transition-all duration-700" style={{ transform: `translate(${dronePos.x}px, ${dronePos.y}px)` }}>
                    <DroneSVG isFlying={dronePos.isFlying} rotate={dronePos.rotate} z={dronePos.z} size={280} />
                  </div>

                  {/* Virtual Floor */}
                  <div className="absolute bottom-0 w-full h-1/4 bg-blue-500/10 blur-3xl rounded-full"></div>

                  <div className="absolute top-10 right-10 flex gap-4">
                    <div className="bg-red-500 w-4 h-4 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                    <div className="bg-green-500 w-4 h-4 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
                  </div>

                  <div className="absolute bottom-12 left-12 text-lg font-mono text-blue-400/60 bg-black/60 px-8 py-4 rounded-[1.5rem] backdrop-blur-xl border border-white/5 shadow-2xl">
                    <span className="text-white/30 mr-4">COORD</span> X:{Math.round(dronePos.x)} Y:{Math.round(dronePos.y)} Z:{Math.round(dronePos.z)}
                  </div>
                </div>

                <div className="bg-white rounded-[4rem] p-12 border-4 border-slate-50 shadow-2xl">
                  <h4 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                    <Terminal size={24} /> Real-time Data
                  </h4>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="p-10 bg-blue-50 rounded-[3rem] border-4 border-blue-100 flex flex-col justify-between h-56 group hover:bg-blue-500 transition-all duration-500">
                      <div className="text-blue-400 font-black flex items-center gap-4 text-xl group-hover:text-white"><Ruler size={32} /> TOF</div>
                      <div className="text-6xl font-mono text-blue-600 font-black group-hover:text-white">{sensorData.tof.toFixed(1)} <span className="text-2xl group-hover:text-white/50">cm</span></div>
                    </div>
                    <div className="p-10 bg-emerald-50 rounded-[3rem] border-4 border-emerald-100 flex flex-col justify-between h-56 group hover:bg-emerald-500 transition-all duration-500">
                      <div className="text-emerald-400 font-black flex items-center gap-4 text-xl group-hover:text-white"><Navigation size={32} /> FLOW</div>
                      <div className="text-6xl font-mono text-emerald-600 font-black group-hover:text-white">{sensorData.opticalFlow.vx.toFixed(1)} <span className="text-2xl group-hover:text-white/50">m/s</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-48 px-6 border-t-8 border-slate-50 bg-white rounded-t-[6rem] shadow-[0_-30px_100px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
          <div className="flex items-center gap-10">
            <div className="w-24 h-24 bg-blue-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200">
              <Navigation size={48} />
            </div>
            <div>
              <span className="school-title text-6xl text-blue-500 block">Codelift Academy</span>
              <p className="text-slate-400 text-2xl mt-4 font-bold">Build the Future. One Block at a Time.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-300 text-xl font-black mb-6">© 2025 CODELIFT EDUTECH</p>
            <div className="flex gap-8 justify-center md:justify-end">
              {[<Globe size={40} />, <Cpu size={40} />, <Terminal size={40} />].map((icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, backgroundColor: '#3b82f6', color: '#fff' }}
                  className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 transition-all cursor-pointer shadow-lg"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default App;
