import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Globe, Facebook, Twitter, Instagram, 
  MessageCircle, Star, Calendar, CreditCard, CheckCircle2, ChevronDown, 
  MapPin, ShieldCheck, Camera, Clock, Upload, ArrowLeft, PoundSterling, AlertCircle,
  User, Lock, Mail, LogOut
} from 'lucide-react';

export function App() {
  const [appView, setAppView] = useState('public'); // 'public' | 'worker' | 'client'
  
  // Auth State
  const [currentUser, setCurrentUser] = useState(null); // { name, role: 'client'|'staff' }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRole, setAuthRole] = useState('client'); // 'client' | 'staff'

  const handleLogout = () => {
    setCurrentUser(null);
    setAppView('public');
  };
  
  // Public Site State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Brand Colors matching the screenshots
  const colors = {
    primaryBlue: '#007BFF',
    limeGreen: '#D4FC2C',
    brandPurple: '#8B5CF6',
    deepBlue: '#0F8BFD',
    skyBlue: '#71C4FF',
    aqua: '#1EE0AC',
    darkRed: '#D91A5D'
  };

  const services = [
    { name: 'House Cleaning', color: colors.brandPurple, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Office Cleaning', color: colors.deepBlue, img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Window Cleaning', color: colors.skyBlue, img: 'https://images.unsplash.com/photo-1558384462-8e364cb057a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Commercial Cleaning', color: colors.aqua, img: 'https://images.unsplash.com/photo-1628177142898-93e46e646004?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'End of Tenancy Cleaning', color: colors.limeGreen, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Carpet Cleaning', color: colors.darkRed, img: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  // ==========================================
  // WORKER PORTAL COMPONENT
  // ==========================================
  const WorkerPortal = () => {
    const [gdprConsent, setGdprConsent] = useState(false);
    const [inGeofence, setInGeofence] = useState(false);
    const [jobStatus, setJobStatus] = useState('not_started'); // not_started, clocked_in, uploading_proof, pending_review
    const [uploadedPhotos, setUploadedPhotos] = useState(0);

    // Simulate GPS pinging
    const simulateArrival = () => {
      setInGeofence(true);
      alert("GPS Ping: You are within 200m of the target property.");
    };

    const handleClockOut = () => setJobStatus('uploading_proof');
    
    const handleUpload = () => {
      if (uploadedPhotos < 3) setUploadedPhotos(p => p + 1);
    };

    const handleSubmitProof = () => {
      if (uploadedPhotos >= 2) setJobStatus('pending_review');
      else alert("Please upload at least 2 photos of the finished job.");
    };

    return (
      <div className="min-h-screen bg-gray-900 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col min-h-screen">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md relative z-10">
            <button onClick={() => setAppView('public')} className="flex items-center gap-1 text-sm font-medium hover:text-lime-300">
              <ArrowLeft size={16} /> Exit
            </button>
            <h2 className="font-bold tracking-wider">RC WORKER PORTAL</h2>
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-blue-900 font-bold">AJ</div>
          </div>

          <div className="flex-grow p-6 overflow-y-auto">
            {/* Earnings Dashboard Preview */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-5 text-white mb-6 shadow-lg">
              <p className="text-sm opacity-80 mb-1 font-medium">This Week's Earnings</p>
              <h3 className="text-4xl font-extrabold flex items-center mb-2"><PoundSterling size={32} /> 450.00</h3>
              <div className="bg-blue-800/50 rounded-lg p-2 text-xs flex justify-between items-center">
                <span>Next Payout: Friday</span>
                <span className="bg-lime-400 text-blue-900 px-2 py-1 rounded font-bold">In Progress</span>
              </div>
            </div>

            {/* Current Assignment */}
            <div className="mb-6">
              <h4 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3">Current Assignment</h4>
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm relative overflow-hidden">
                {/* Status Strip */}
                <div className={`absolute top-0 left-0 w-1 h-full ${jobStatus === 'not_started' ? 'bg-orange-400' : jobStatus === 'clocked_in' ? 'bg-lime-400' : 'bg-blue-400'}`}></div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-1">Standard House Clean</h3>
                <p className="text-gray-600 flex items-start gap-2 text-sm mb-4">
                  <MapPin size={16} className="mt-0.5 text-blue-500 flex-shrink-0" /> 
                  142 Baker Street, Marylebone, London, NW1 6XE
                </p>

                {/* Workflow States */}
                {jobStatus === 'not_started' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm flex gap-3">
                      <ShieldCheck size={24} className="text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-700">UK GDPR Notice</p>
                        <p className="text-gray-500 text-xs mt-1">To prevent fraud, we ping your GPS at clock-in and clock-out. No live tracking occurs during your shift.</p>
                      </div>
                    </div>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-blue-600"
                        checked={gdprConsent}
                        onChange={(e) => setGdprConsent(e.target.checked)}
                      />
                      <span className="text-sm text-gray-700 font-medium">I consent to a single location ping to verify my arrival at the job site.</span>
                    </label>

                    {!inGeofence ? (
                       <button 
                        onClick={simulateArrival}
                        className="w-full py-3 bg-gray-200 text-gray-600 font-bold rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-300 transition flex items-center justify-center gap-2"
                      >
                        <MapPin size={18} /> Simulate Arrival (Dev Test)
                      </button>
                    ) : (
                      <div className="text-green-600 text-sm font-bold flex items-center gap-2 bg-green-50 p-2 rounded">
                        <CheckCircle2 size={16} /> Within 200m of Property
                      </div>
                    )}

                    <button 
                      disabled={!gdprConsent || !inGeofence}
                      onClick={() => setJobStatus('clocked_in')}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                        !gdprConsent || !inGeofence 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-lime-400 text-blue-900 hover:bg-lime-500 hover:scale-[1.02]'
                      }`}
                    >
                      <Clock size={20} /> Clock In Now
                    </button>
                  </div>
                )}

                {jobStatus === 'clocked_in' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-lime-100 text-lime-800 p-4 rounded-lg flex items-center justify-between border border-lime-200">
                      <div className="flex items-center gap-2 font-bold">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                        </span>
                        Shift Active
                      </div>
                      <span className="font-mono font-bold text-lg tracking-widest">02:14:36</span>
                    </div>

                    <button 
                      onClick={handleClockOut}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Clock size={20} /> Clock Out & Submit Proof
                    </button>
                  </div>
                )}

                {jobStatus === 'uploading_proof' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800 mb-2">
                      <strong>Proof of Work Required:</strong> Please upload 2-3 photos of the cleaned space to complete your shift.
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          onClick={handleUpload}
                          className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition ${
                            i < uploadedPhotos 
                            ? 'border-lime-400 bg-lime-50 text-lime-600' 
                            : 'border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {i < uploadedPhotos ? <CheckCircle2 size={24} /> : <Camera size={24} />}
                          <span className="text-xs mt-1 font-medium">{i < uploadedPhotos ? 'Added' : 'Add Photo'}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={handleSubmitProof}
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                        uploadedPhotos >= 2 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                      }`}
                    >
                      <Upload size={18} /> Submit Photos & Finish
                    </button>
                  </div>
                )}

                {jobStatus === 'pending_review' && (
                  <div className="space-y-4 text-center py-6 animate-fade-in">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                      <Clock size={32} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">Job Complete!</h3>
                    <p className="text-sm text-gray-500">Your shift has ended and photos are uploaded.</p>
                    
                    <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg text-sm text-left mt-4 flex gap-3 items-start">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Pending Review (Soft Approval)</strong>
                        <p className="mt-1 text-orange-700/80">Funds will be auto-approved to your Stripe account in exactly 4 hours unless the client disputes the quality.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // CLIENT PORTAL COMPONENT
  // ==========================================
  const ClientPortal = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl relative flex flex-col min-h-screen border-x">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lime-400 rounded-sm transform rotate-45 flex items-center justify-center border-2 border-white">
                <div className="w-4 h-4 bg-white transform -rotate-45"></div>
              </div>
              <h2 className="font-bold tracking-wider">CLIENT DASHBOARD</h2>
            </div>
            <button onClick={() => setAppView('public')} className="text-sm font-medium hover:text-lime-300 flex items-center gap-1">
              <ArrowLeft size={16} /> Back to Site
            </button>
          </div>

          <div className="flex-grow p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome back, {currentUser?.name || 'Emma'}!</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Action Required: Approvals */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <AlertCircle className="text-orange-400" /> Action Required
                  </h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">Soft Approval</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Your cleaner has finished. Please review the photos to approve the release of funds.</p>
                <div className="bg-gray-50 p-3 rounded mb-4 text-sm border">
                  <strong>Standard House Clean</strong><br/>
                  <span className="text-gray-500">Completed 1 hour ago</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-lime-400 text-blue-900 font-bold py-2 rounded hover:bg-lime-500 transition shadow-sm">Approve Work</button>
                  <button className="flex-1 bg-red-100 text-red-700 font-bold py-2 rounded hover:bg-red-200 transition shadow-sm">Report Issue</button>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4">
                  <Calendar className="text-blue-500" /> Upcoming Bookings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded border transition">
                    <div>
                      <strong className="block text-sm">Window Cleaning</strong>
                      <span className="text-xs text-gray-500 block">Next Tuesday, 10:00 AM</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Confirmed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded border transition">
                    <div>
                      <strong className="block text-sm">Carpet Cleaning</strong>
                      <span className="text-xs text-gray-500 block">May 15th, 2:00 PM</span>
                    </div>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">Pending</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setAppView('public'); setShowBookingModal(true); }}
                  className="w-full mt-6 border-2 border-dashed border-blue-200 text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition"
                >
                  + Book New Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // VIEW ROUTER
  // ==========================================
  if (appView === 'worker') {
    if (!currentUser || currentUser.role !== 'staff') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-blue-600 max-w-sm">
             <ShieldCheck size={48} className="mx-auto text-blue-500 mb-4" />
             <h2 className="text-2xl font-bold mb-2 text-gray-800">Staff Access Only</h2>
             <p className="text-gray-500 mb-6">You must be logged in as staff to view the worker portal.</p>
             <button onClick={() => { setAppView('public'); setShowAuthModal(true); setAuthRole('staff'); }} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md">Login to Portal</button>
           </div>
        </div>
      );
    }
    return <WorkerPortal />;
  }

  if (appView === 'client') {
    if (!currentUser || currentUser.role !== 'client') {
       return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-blue-600 max-w-sm">
             <User size={48} className="mx-auto text-blue-500 mb-4" />
             <h2 className="text-2xl font-bold mb-2 text-gray-800">Client Login Required</h2>
             <p className="text-gray-500 mb-6">Please log in to manage your bookings and approvals.</p>
             <button onClick={() => { setAppView('public'); setShowAuthModal(true); setAuthRole('client'); }} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md">Login Now</button>
           </div>
        </div>
      );
    }
    return <ClientPortal />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-4 py-2 flex justify-between items-center text-sm border-b">
        <div className="flex gap-3 text-blue-600">
          <Facebook size={18} className="cursor-pointer hover:opacity-70" />
          <Twitter size={18} className="cursor-pointer hover:opacity-70" />
          <Instagram size={18} className="cursor-pointer hover:opacity-70" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setActiveLang(activeLang === 'EN' ? 'ES' : 'EN')}>
            <Globe size={16} className="text-blue-500" />
            <span className="font-semibold text-blue-500">{activeLang}</span>
            <ChevronDown size={14} className="text-blue-500" />
          </div>
          <a href="tel:+447496167320" className="text-blue-500 font-medium hover:underline">
            +44 7496167320
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-blue-600 text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-lime-400 rounded-sm transform rotate-45 flex items-center justify-center border-2 border-white">
              <div className="w-4 h-4 bg-white transform -rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-wider">RITACOLLINS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-semibold">
            <a href="#home" className="hover:text-lime-300 transition">Home</a>
            <a href="#services" className="hover:text-lime-300 transition">Services</a>
            <a href="#about" className="hover:text-lime-300 transition">About Us</a>
            
            {currentUser ? (
              <div className="flex items-center gap-4 bg-blue-700 px-4 py-2 rounded-full border border-blue-500 shadow-inner">
                <span className="flex items-center gap-2 text-sm text-lime-100"><User size={16} /> {currentUser.name}</span>
                <div className="w-px h-4 bg-blue-500"></div>
                <button onClick={() => setAppView(currentUser.role === 'staff' ? 'worker' : 'client')} className="text-lime-300 hover:text-white text-sm font-bold">Dashboard</button>
                <button onClick={handleLogout} title="Logout" className="text-blue-300 hover:text-red-300 transition"><LogOut size={16}/></button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthRole('client'); setShowAuthModal(true); }}
                className="flex items-center gap-2 text-white hover:text-lime-300 transition"
              >
                <User size={18} /> Login / Sign Up
              </button>
            )}

            <button 
              onClick={() => setShowBookingModal(true)}
              className="text-lime-400 font-bold hover:text-white transition"
            >
              Book Now
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             {currentUser ? (
               <button onClick={() => setAppView(currentUser.role === 'staff' ? 'worker' : 'client')} className="text-lime-300 hover:text-white transition">
                 <User size={24} />
               </button>
             ) : (
               <button onClick={() => { setAuthRole('client'); setShowAuthModal(true); }} className="text-white hover:text-lime-300 transition">
                 <User size={24} />
               </button>
             )}
             <button 
              onClick={() => setShowBookingModal(true)}
              className="text-lime-400 font-bold hover:text-white transition"
            >
              Book Now
            </button>
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-700 p-4 flex flex-col gap-4 shadow-lg pb-6">
            <a href="#home" onClick={toggleMenu} className="font-semibold text-lg border-b border-blue-600 pb-2">Home</a>
            <a href="#services" onClick={toggleMenu} className="font-semibold text-lg border-b border-blue-600 pb-2">Services</a>
            <a href="#about" onClick={toggleMenu} className="font-semibold text-lg border-b border-blue-600 pb-2">About Us</a>
            <a href="#contact" onClick={toggleMenu} className="font-semibold text-lg border-b border-blue-600 pb-2">Contact</a>
            {currentUser && (
               <button onClick={handleLogout} className="text-left font-semibold text-lg text-red-300 border-b border-blue-600 pb-2 flex items-center gap-2">
                 <LogOut size={18} /> Logout
               </button>
            )}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative bg-blue-600 text-white py-16 px-6 overflow-hidden flex flex-col items-center text-center"
          style={{ minHeight: '80vh' }}
        >
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1584820927498-cafe8c1c9695?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
          ></div>
          
          <div className="relative z-10 max-w-3xl mt-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 drop-shadow-lg">
              PROFESSIONAL<br/>
              <span className="text-lime-300">CLEANING</span><br/>
              SERVICES IN<br/>LONDON
            </h1>
            
            <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow-md px-4">
              Rita Collins Cleaning Services is a professional cleaning company located in London with reliable, dedicated staff committed to providing top-quality cleaning services. Our top clients include bars, lounges, event centers, restaurants, hospitals and many more.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-lime-400 text-blue-900 font-bold text-lg py-4 px-10 rounded-full hover:bg-lime-300 transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar size={20} /> Book Appointment
              </button>
            </div>
          </div>
        </section>

        {/* Call Now Banner */}
        <div className="bg-white py-6 text-center shadow-inner relative z-20">
          <h2 className="text-2xl md:text-4xl text-blue-500 font-light">
            Call Now <a href="tel:+447496167320" className="font-bold hover:underline">+44 7496167320</a>
          </h2>
        </div>

        {/* Why Choose Us */}
        <section id="about" className="py-16 px-6" style={{ backgroundColor: colors.limeGreen }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-12 tracking-wide">
              WHY CHOOSE US?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-12 gap-x-4 text-blue-600 font-semibold text-lg md:text-2xl">
              <div className="flex gap-4 border-l-4 border-blue-600 pl-4 h-full items-center">
                Certified Professional<br/>Cleaners
              </div>
              <div className="flex gap-4 border-l-4 border-blue-600 pl-4 h-full items-center">
                Eco-Friendly<br/>Cleaning Solutions
              </div>
              <div className="flex gap-4 border-l-4 border-blue-600 pl-4 h-full items-center">
                100% Satisfaction<br/>Guaranteed
              </div>
              <div className="flex gap-4 border-l-4 border-blue-600 pl-4 h-full items-center">
                Available Evenings<br/>& Weekends
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white py-12">
          <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-10 tracking-wide">
            OUR SERVICES
          </h2>
          
          <div className="flex flex-col w-full">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="w-full relative h-48 md:h-64 flex items-center px-8 md:px-24 overflow-hidden group cursor-pointer"
                style={{ backgroundColor: service.color }}
                onClick={() => setShowBookingModal(true)}
              >
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80 mix-blend-multiply bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
                
                <h3 className="relative z-10 text-3xl md:text-5xl font-light text-white w-1/2 drop-shadow-md">
                  {service.name.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word} <br/>
                    </React.Fragment>
                  ))}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: colors.limeGreen }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-blue-600 mb-8 tracking-wider">
              EMMA SMITH
            </h2>
            <p className="text-xl md:text-2xl text-blue-600 font-light italic leading-relaxed mb-10">
              "Rita Collins Cleaning Services did an amazing job cleaning my home. They were reliable, professional and efficient. I highly recommend them!"
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 opacity-50"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-16 pb-8 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
          CONTACT US FOR<br/>A FREE QUOTE!
        </h2>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="p-3 border-2 border-blue-200 rounded focus:border-blue-500 outline-none" />
            <input type="email" placeholder="Your Email" className="p-3 border-2 border-blue-200 rounded focus:border-blue-500 outline-none" />
            <button className="bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>

        <div className="text-gray-500 text-sm border-t pt-8 flex flex-col items-center gap-4">
          <p>&copy; 2026 Rita Collins Cleaning Services. All rights reserved.</p>
          <div className="flex flex-col items-center">
            <p className="mt-2 text-xs">Site managed by TMMT LTD</p>
            {/* TOGGLE FOR WORKER PORTAL */}
            <button 
              onClick={() => {
                if (currentUser && currentUser.role === 'staff') {
                  setAppView('worker');
                } else {
                  setAuthRole('staff');
                  setAuthMode('login');
                  setShowAuthModal(true);
                }
              }}
              className="mt-4 text-blue-600 font-semibold text-xs hover:underline flex items-center gap-1"
            >
              <ShieldCheck size={14} /> Access Staff Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-white rounded-lg shadow-2xl w-80 mb-4 overflow-hidden border border-gray-200 flex flex-col">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <span className="font-bold flex items-center gap-2"><MessageCircle size={18}/> Live Support</span>
              <X size={20} className="cursor-pointer" onClick={() => setIsChatOpen(false)} />
            </div>
            <div className="h-64 p-4 bg-gray-50 overflow-y-auto text-sm text-gray-600 flex flex-col gap-2">
              <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none self-start max-w-[80%] text-blue-900">
                Hi! Welcome to RC Cleaning. How can we help you today?
              </div>
            </div>
            <div className="p-3 bg-white border-t flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-grow p-2 border rounded text-sm focus:outline-none focus:border-blue-500" />
              <button className="bg-blue-600 text-white px-4 rounded text-sm font-bold">Send</button>
            </div>
          </div>
        ) : null}
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:scale-110 transition-transform float-right"
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} className="transform scale-x-[-1]" />}
        </button>
      </div>

      {/* Booking & Payment Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold">Book a Cleaning Service</h3>
              <button onClick={() => setShowBookingModal(false)}><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">1. Your Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="border p-2 rounded" />
                  <input type="text" placeholder="Last Name" className="border p-2 rounded" />
                  <input type="tel" placeholder="Phone Number" className="border p-2 rounded col-span-2" />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">2. Service Required</h4>
                <select className="w-full border p-2 rounded mb-3">
                  {services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                </select>
                <input type="date" className="w-full border p-2 rounded mb-3" />
                <textarea placeholder="Any specific requirements? (e.g. bring eco-friendly products only)" className="w-full border p-2 rounded h-20"></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <CreditCard size={18} /> Secure Express Checkout
                </h4>
                <p className="text-xs text-gray-500 mb-3">Reserve your slot instantly with a £50 deposit.</p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Card Number" className="border p-2 rounded font-mono" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" className="border p-2 rounded w-1/2" />
                    <input type="text" placeholder="CVC" className="border p-2 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gray-100 border-t flex justify-end gap-3">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="px-5 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Payment simulated successfully! Booking confirmed.");
                  setShowBookingModal(false);
                }}
                className="px-6 py-2 bg-lime-400 text-blue-900 font-bold rounded hover:bg-lime-500 shadow-md flex items-center gap-2"
              >
                <CheckCircle2 size={18} /> Pay & Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal (Login / Sign Up) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Lock size={20} /> {authMode === 'login' ? 'Secure Login' : 'Create Account'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="hover:text-lime-300 transition"><X size={24} /></button>
            </div>

            <div className="p-6">
              {/* Role Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button 
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition flex items-center justify-center gap-2 ${authRole === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  onClick={() => setAuthRole('client')}
                >
                  <User size={16} /> Client
                </button>
                <button 
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition flex items-center justify-center gap-2 ${authRole === 'staff' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  onClick={() => setAuthRole('staff')}
                >
                  <ShieldCheck size={16} /> Staff
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                // Simulate Authentication Submission
                setCurrentUser({ 
                  name: authMode === 'signup' ? (authRole === 'client' ? 'New Client' : 'New Staff') : (authRole === 'client' ? 'Emma Smith' : 'Alex Johnson'), 
                  role: authRole 
                });
                setShowAuthModal(false);
                setAppView(authRole === 'staff' ? 'worker' : 'client');
              }} className="space-y-4">
                
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input required type="text" placeholder="John Doe" className="w-full border pl-10 p-2.5 rounded focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input required type="email" placeholder="you@example.com" className="w-full border pl-10 p-2.5 rounded focus:border-blue-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input required type="password" placeholder="••••••••" className="w-full border pl-10 p-2.5 rounded focus:border-blue-500 outline-none" />
                  </div>
                </div>

                {authMode === 'signup' && authRole === 'staff' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">National Insurance Number (UK)</label>
                    <input required type="text" placeholder="QQ 12 34 56 A" className="w-full border p-2.5 rounded focus:border-blue-500 outline-none font-mono uppercase" />
                  </div>
                )}

                <button type="submit" className="w-full bg-lime-400 text-blue-900 font-extrabold py-3 rounded-lg hover:bg-lime-500 hover:scale-[1.02] shadow-md transition-all mt-4">
                  {authMode === 'login' ? 'Sign In to Dashboard' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600 border-t pt-4">
                {authMode === 'login' ? (
                  <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-blue-600 font-bold hover:underline">Sign up</button></p>
                ) : (
                  <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-blue-600 font-bold hover:underline">Log in</button></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export default App
