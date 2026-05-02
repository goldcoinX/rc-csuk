import React, { useState } from 'react';
import { 
  Menu, X, Phone, Globe, Share2, 
  MessageCircle, Star, Calendar, CreditCard, CircleCheck, ChevronDown, 
  MapPin, ShieldCheck, Camera, Clock, Upload, ArrowLeft, PoundSterling, CircleAlert,
  User, Lock, Mail, LogOut
} from 'lucide-react';

export default function App() {
  const [appView, setAppView] = useState('public'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [authRole, setAuthRole] = useState('client'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setAppView('public');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
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

  const WorkerPortal = () => {
    const [gdprConsent, setGdprConsent] = useState(false);
    const [inGeofence, setInGeofence] = useState(false);
    const [jobStatus, setJobStatus] = useState('not_started'); 
    const [uploadedPhotos, setUploadedPhotos] = useState(0);

    const simulateArrival = () => {
      setInGeofence(true);
      alert("GPS Ping: You are within 200m of the target property.");
    };

    const handleClockOut = () => setJobStatus('uploading_proof');
    const handleUpload = () => { if (uploadedPhotos < 3) setUploadedPhotos(p => p + 1); };
    const handleSubmitProof = () => {
      if (uploadedPhotos >= 2) setJobStatus('pending_review');
      else alert("Please upload at least 2 photos of the finished job.");
    };

    return (
      <div className="min-h-screen bg-gray-900 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col min-h-screen">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md relative z-10">
            <button onClick={() => setAppView('public')} className="flex items-center gap-1 text-sm font-medium hover:text-lime-300">
              <ArrowLeft size={16} /> Exit
            </button>
            <h2 className="font-bold tracking-wider">RC WORKER PORTAL</h2>
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-blue-900 font-bold">AJ</div>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-5 text-white mb-6 shadow-lg">
              <p className="text-sm opacity-80 mb-1 font-medium">This Week's Earnings</p>
              <h3 className="text-4xl font-extrabold flex items-center mb-2"><PoundSterling size={32} /> 450.00</h3>
              <div className="bg-blue-800/50 rounded-lg p-2 text-xs flex justify-between items-center">
                <span>Next Payout: Friday</span>
                <span className="bg-lime-400 text-blue-900 px-2 py-1 rounded font-bold">In Progress</span>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3">Current Assignment</h4>
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${jobStatus === 'not_started' ? 'bg-orange-400' : jobStatus === 'clocked_in' ? 'bg-lime-400' : 'bg-blue-400'}`}></div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">Standard House Clean</h3>
                <p className="text-gray-600 flex items-start gap-2 text-sm mb-4">
                  <MapPin size={16} className="mt-0.5 text-blue-500 flex-shrink-0" /> 142 Baker Street, Marylebone, London
                </p>
                {jobStatus === 'not_started' && (
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} />
                      <span className="text-sm text-gray-700 font-medium">I consent to a single location ping to verify my arrival.</span>
                    </label>
                    {!inGeofence ? (
                       <button onClick={simulateArrival} className="w-full py-3 bg-gray-200 text-gray-600 font-bold rounded-lg border-2 border-dashed hover:bg-gray-300 transition flex justify-center gap-2">
                        <MapPin size={18} /> Simulate Arrival
                      </button>
                    ) : (
                      <div className="text-green-600 text-sm font-bold flex items-center gap-2 bg-green-50 p-2 rounded"><CircleCheck size={16} /> Within 200m of Property</div>
                    )}
                    <button disabled={!gdprConsent || !inGeofence} onClick={() => setJobStatus('clocked_in')} className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${!gdprConsent || !inGeofence ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-lime-400 text-blue-900 hover:bg-lime-500 hover:scale-[1.02]'}`}>
                      <Clock size={20} /> Clock In Now
                    </button>
                  </div>
                )}
                {jobStatus === 'clocked_in' && (
                  <div className="space-y-4">
                    <div className="bg-lime-100 text-lime-800 p-4 rounded-lg flex items-center justify-between border border-lime-200">
                      <div className="flex items-center gap-2 font-bold">Shift Active</div>
                      <span className="font-mono font-bold text-lg tracking-widest">02:14:36</span>
                    </div>
                    <button onClick={handleClockOut} className="w-full py-4 rounded-xl font-bold text-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md flex justify-center gap-2">
                      <Clock size={20} /> Clock Out & Submit Proof
                    </button>
                  </div>
                )}
                {jobStatus === 'uploading_proof' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800 mb-2">Please upload 2-3 photos.</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} onClick={handleUpload} className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition ${i < uploadedPhotos ? 'border-lime-400 bg-lime-50 text-lime-600' : 'border-dashed border-gray-300 bg-gray-50 text-gray-400'}`}>
                          {i < uploadedPhotos ? <CircleCheck size={24} /> : <Camera size={24} />}
                        </div>
                      ))}
                    </div>
                    <button onClick={handleSubmitProof} className={`w-full py-3 rounded-xl font-bold text-white flex justify-center gap-2 ${uploadedPhotos >= 2 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}>
                      <Upload size={18} /> Submit Photos & Finish
                    </button>
                  </div>
                )}
                {jobStatus === 'pending_review' && (
                  <div className="space-y-4 text-center py-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600"><Clock size={32} /></div>
                    <h3 className="font-bold text-xl text-gray-800">Job Complete!</h3>
                    <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg text-sm text-left mt-4 flex gap-3 items-start">
                      <CircleAlert size={20} className="flex-shrink-0 mt-0.5" />
                      <div><strong>Pending Review (Soft Approval)</strong><p className="mt-1 text-orange-700/80">Funds will be auto-approved to your Stripe account in exactly 4 hours.</p></div>
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

  const ClientPortal = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl relative flex flex-col min-h-screen border-x">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md relative z-10">
            <h2 className="font-bold tracking-wider">CLIENT DASHBOARD</h2>
            <button onClick={() => setAppView('public')} className="text-sm font-medium hover:text-lime-300 flex items-center gap-1"><ArrowLeft size={16} /> Back to Site</button>
          </div>
          <div className="flex-grow p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome back, {currentUser?.name || 'Emma'}!</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4"><CircleAlert className="text-orange-400" /> Action Required</h3>
                <p className="text-sm text-gray-600 mb-4">Your cleaner has finished. Please review the photos to approve the release of funds.</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-lime-400 text-blue-900 font-bold py-2 rounded hover:bg-lime-500 transition shadow-sm">Approve Work</button>
                  <button className="flex-1 bg-red-100 text-red-700 font-bold py-2 rounded hover:bg-red-200 transition shadow-sm">Report Issue</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-4"><Calendar className="text-blue-500" /> Upcoming Bookings</h3>
                <button onClick={() => { setAppView('public'); setShowBookingModal(true); }} className="w-full mt-6 border-2 border-dashed border-blue-200 text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition">
                  + Book New Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (appView === 'worker') {
    if (!currentUser || currentUser.role !== 'staff') return <div className="min-h-screen flex items-center justify-center"><h2 className="text-2xl font-bold">Staff Access Only</h2></div>;
    return <WorkerPortal />;
  }

  if (appView === 'client') {
    if (!currentUser || currentUser.role !== 'client') return <div className="min-h-screen flex items-center justify-center"><h2 className="text-2xl font-bold">Client Access Only</h2></div>;
    return <ClientPortal />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col bg-white">
      <div className="bg-white px-4 py-2 flex justify-between items-center text-sm border-b">
        <div className="flex gap-3 text-blue-600">
          <Share2 size={18} className="cursor-pointer hover:opacity-70" />
          <X size={18} className="cursor-pointer hover:opacity-70" />
          <Camera size={18} className="cursor-pointer hover:opacity-70" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setActiveLang(activeLang === 'EN' ? 'ES' : 'EN')}>
            <Globe size={16} className="text-blue-500" />
            <span className="font-semibold text-blue-500">{activeLang}</span>
          </div>
          <a href="tel:+447496167320" className="text-blue-500 font-bold hover:underline">+44 7496167320</a>
        </div>
      </div>

      <nav className="bg-blue-600 text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-bold tracking-wider">RITACOLLINS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-semibold">
            <a href="#home" className="hover:text-lime-300 transition">Home</a>
            <a href="#services" className="hover:text-lime-300 transition">Services</a>
            
            {currentUser ? (
              <div className="flex items-center gap-4 bg-blue-700 px-4 py-2 rounded-full border border-blue-500">
                <span className="flex items-center gap-2 text-sm text-lime-100"><User size={16} /> {currentUser.name}</span>
                <button onClick={() => setAppView(currentUser.role === 'staff' ? 'worker' : 'client')} className="text-lime-300 hover:text-white text-sm font-bold">Dashboard</button>
                <button onClick={handleLogout} title="Logout" className="text-blue-300 hover:text-red-300"><LogOut size={16}/></button>
              </div>
            ) : (
              <button onClick={() => { setAuthRole('client'); setShowAuthModal(true); }} className="flex items-center gap-2 hover:text-lime-300">
                <User size={18} /> Login / Sign Up
              </button>
            )}

            <button onClick={() => setShowBookingModal(true)} className="text-lime-400 font-bold hover:text-white transition">Book Now</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <section id="home" className="relative bg-blue-600 py-20 px-6 flex flex-col items-center text-center min-h-[80vh] justify-center">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1584820927498-cafe8c1c9695?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}></div>
          
          <div className="relative z-10 max-w-3xl mt-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 text-white drop-shadow-xl">
              PROFESSIONAL<br/>
              <span className="text-lime-300">CLEANING</span><br/>
              SERVICES IN<br/>LONDON
            </h1>
            
            <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow-md px-4 text-white">
              Rita Collins Cleaning Services is a professional cleaning company located in London with reliable, dedicated staff committed to providing top-quality cleaning services.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
               <button onClick={() => setShowBookingModal(true)} className="bg-lime-400 text-blue-900 font-extrabold text-lg py-4 px-10 rounded-full hover:bg-lime-300 shadow-xl flex items-center justify-center gap-2">
                <Calendar size={20} /> Book Appointment
              </button>
            </div>
          </div>
        </section>

        <div className="bg-white py-6 text-center shadow-inner relative z-20">
          <h2 className="text-2xl md:text-4xl text-blue-500 font-light">
            Call Now <a href="tel:+447496167320" className="font-bold hover:underline">+44 7496167320</a>
          </h2>
        </div>

        <section id="services" className="bg-white py-12">
          <h2 className="text-4xl font-extrabold text-blue-600 text-center mb-10 tracking-wide">OUR SERVICES</h2>
          <div className="flex flex-col w-full">
            {services.map((service, index) => (
              <div key={index} className="w-full relative h-48 md:h-64 flex items-center px-8 md:px-24 overflow-hidden group cursor-pointer" style={{ backgroundColor: service.color }} onClick={() => setShowBookingModal(true)}>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80 mix-blend-multiply bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${service.img})` }}></div>
                <h3 className="relative z-10 text-3xl md:text-5xl font-light text-white w-1/2 drop-shadow-md">
                  {service.name.split(' ').map((word, i) => (<React.Fragment key={i}>{word} <br/></React.Fragment>))}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white pt-16 pb-8 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-6">CONTACT US FOR<br/>A FREE QUOTE!</h2>
        <div className="text-gray-500 text-sm border-t pt-8 flex flex-col items-center gap-4">
          <p>&copy; 2026 Rita Collins Cleaning Services.</p>
          <div className="flex flex-col items-center">
            <p className="mt-2 text-xs">Site managed by TMMT LTD</p>
            <button onClick={() => { setAuthRole('staff'); setAuthMode('login'); setShowAuthModal(true); }} className="mt-4 text-blue-600 font-semibold text-xs hover:underline flex items-center gap-1">
              <ShieldCheck size={14} /> Access Staff Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2"><Lock size={20} /> {authMode === 'login' ? 'Secure Login' : 'Create Account'}</h3>
              <button onClick={() => setShowAuthModal(false)} className="hover:text-lime-300 transition"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button className={`flex-1 py-2 text-sm font-bold rounded-md transition flex items-center justify-center gap-2 ${authRole === 'client' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`} onClick={() => setAuthRole('client')}><User size={16} /> Client</button>
                <button className={`flex-1 py-2 text-sm font-bold rounded-md transition flex items-center justify-center gap-2 ${authRole === 'staff' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`} onClick={() => setAuthRole('staff')}><ShieldCheck size={16} /> Staff</button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setCurrentUser({ name: 'Emma Smith', role: authRole }); setShowAuthModal(false); setAppView(authRole === 'staff' ? 'worker' : 'client'); }} className="space-y-4">
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
                <button type="submit" className="w-full bg-lime-400 text-blue-900 font-extrabold py-3 rounded-lg hover:bg-lime-500 shadow-md transition-all mt-4">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 text-center">
             <CircleCheck size={48} className="text-green-500 mx-auto mb-4" />
             <h3 className="text-2xl font-bold mb-4">Secure Your Slot</h3>
             <p className="text-gray-600 mb-6">Call us directly to check availability and book your service instantly.</p>
             <a href="tel:+447496167320" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-block w-full mb-4 text-lg hover:bg-blue-700">+44 7496167320</a>
             <button onClick={() => setShowBookingModal(false)} className="text-gray-500 font-bold hover:text-gray-800">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
