import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-[#FCFBFA] min-h-screen font-sans">
      
      {/* --- MINIMAL HERO --- */}
      <section className="pt-32 pb-20 border-b border-stone-200">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.5em] text-red-900 font-bold mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900">Contact Us</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* --- LEFT: CONTACT FORM --- */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif mb-6">Send an Inquiry</h2>
              <p className="text-stone-500 font-light leading-relaxed">
                Whether you're inquiring about a private tasting, a rare vintage, or a 
                corporate event, our concierge team is here to assist.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-b border-stone-300 focus-within:border-red-900 transition-colors py-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Name</label>
                  <input aria-label="Name" type="text" className="bg-transparent w-full outline-none text-stone-900 font-light" placeholder="Julian Taylor" />
                </div>
                <div className="border-b border-stone-300 focus-within:border-red-900 transition-colors py-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Email</label>
                  <input aria-label="Email" type="email" className="bg-transparent w-full outline-none text-stone-900 font-light" placeholder="julian@example.com" />
                </div>
              </div>

              <div className="border-b border-stone-300 focus-within:border-red-900 transition-colors py-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Subject</label>
                <select aria-label="Subject" className="bg-transparent w-full outline-none text-stone-900 font-light appearance-none">
                  <option>Private Tasting Inquiry</option>
                  <option>Wine Club Membership</option>
                  <option>Wholesale & Trade</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div className="border-b border-stone-300 focus-within:border-red-900 transition-colors py-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Message</label>
                <textarea aria-label="Message" rows={4} className="bg-transparent w-full outline-none text-stone-900 font-light resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button className="bg-stone-900 text-white px-12 py-5 text-[11px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all duration-500 shadow-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* --- RIGHT: INFO & MAP --- */}
          <div className="lg:pl-10 space-y-16">
            
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-900">
                  <MapPin size={18} />
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">The Estate</h4>
                </div>
                <p className="text-stone-500 text-sm font-light leading-relaxed">
                  St Asean 11 , Russian Federation Blvd,<br />
                  Phnom Penh 
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-900">
                  <Clock size={18} />
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Cellar Hours</h4>
                </div>
                <p className="text-stone-500 text-sm font-light leading-relaxed">
                  Mon – Sun: 10am – 5pm<br />
                  Closed Public Holidays
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-900">
                  <Phone size={18} />
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Phone</h4>
                </div>
                <p className="text-stone-500 text-sm font-light">+855 (0) 815 510 97</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-900">
                  <Mail size={18} />
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">General Email</h4>
                </div>
                <p className="text-stone-500 text-sm font-light">pherithika@gmail.com</p>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video bg-stone-100  overflow-hidden group">
              <iframe
                title="Institute of Technology of Cambodia"
                /* Real Embed Link for ITC Cambodia */
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.770660634241!2d104.89736507584557!3d11.568297044061801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sInstitute%20of%20Technology%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000"
                className="w-full h-full border-0 contrast-[1.05]" 
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />


              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/95 px-8 py-4 shadow-2xl border border-stone-200">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900">
                    Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;