// import { useState } from 'react'
// import html2canvas from 'html2canvas'
// import QRCode from 'react-qr-code'

// export default function App() {
//   const [form, setForm] = useState({
//     name: '',
//     tagline:'',
//     username: '',
//     followers: '',
//     joined: '',
//     about: '',
//     website: '',
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const exportCard = async () => {
//     const card = document.getElementById('card')
//     const canvas = await html2canvas(card, { scale: 3 })
//     const dataURL = canvas.toDataURL('image/jpeg', 1.0)
//     const link = document.createElement('a')
//     link.href = dataURL
//     link.download = 'x_card.jpeg'
//     link.click()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-200 to-white p-10 font-sans">
//       <div className="flex flex-col md:flex-row gap-10">
//         <div className="flex-1 space-y-4">
//           <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="Tagline" className="w-full border p-2" />
//           <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" />
//           <input name="username" value={form.username} onChange={handleChange} placeholder="@username" className="w-full border p-2" />
//           <input name="followers" value={form.followers} onChange={handleChange} placeholder="Followers" className="w-full border p-2" />
//           <input name="joined" value={form.joined} onChange={handleChange} placeholder="Joined" className="w-full border p-2" />
//           <input name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full border p-2" />
//           <button onClick={exportCard} className="bg-black text-white px-4 py-2 rounded">Download Card</button>
//         </div>

//         <div id="card" className="w-[300px] h-[500px] relative bg-cover bg-center rounded shadow-lg" style={{ backgroundImage: `url('/card.jpeg')` }}>
//           <div className="absolute top-[220px] left-[77px] text-slate-300 text-sm font-semibold uppercase tracking-widest">{form.tagline}</div>
//           <div className="absolute top-[264px] left-[77px] text-slate-400 text-[6px]">{form.followers}</div>
//           <div className="absolute top-[264px] right-[89px] text-slate-300 text-[6px]">{form.joined}</div>
//           <div className="absolute bottom-[196px] left-[77px] text-slate-300 text-[6px]">{form.username}</div>
//           <div className="absolute bottom-[172px] left-[77px] text-slate-300 font-semibold text-[18px]">{form.name}</div>
//           <div className="absolute top-[344px] left-[162px] text-slate-300 text-[6px] w-16">{form.about}</div>
//           <QRCode value={form.website} size={64} className="absolute bottom-[106px] left-[78px] border p-1 rounded" />    
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import QRCodeLib from 'qrcode'

export default function App() {
  const [form, setForm] = useState({
    name: '',
    tagline:'',
    username: '',
    followers: '',
    joined: '',
    about: '',
    website: '',
  })

  const qrRef = useRef(null)

  useEffect(() => {
    if (form.website && qrRef.current) {
      QRCodeLib.toCanvas(qrRef.current, form.website, {
        width: 80,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
    }
  }, [form.website])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const exportCard = async () => {
    const card = document.getElementById('card')
    const canvas = await html2canvas(card, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    })
    const dataURL = canvas.toDataURL('image/jpeg', 1.0)
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'x_card.jpeg'
    link.click()
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-white p-10 font-sans">
      <p className='font-bold font-sans text-xl'>Your own X Card <span className='text-sm text-gray-500'>by Aryan Bola</span></p>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-4">
          <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="Tagline" className="w-full border p-2" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" />
          <input name="username" value={form.username} onChange={handleChange} placeholder="@username" className="w-full border p-2" />
          <input name="followers" type='number' value={form.followers} onChange={handleChange} placeholder="Followers" className="w-full border p-2" />
          <input name="joined" value={form.joined} onChange={handleChange} placeholder="Joined" className="w-full border p-2" />
          <input name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full border p-2" />
          <input name="website" value={form.website} onChange={handleChange} placeholder="Website (for QR)" className="w-full border p-2" />
          <button onClick={exportCard} className="bg-black text-white px-4 py-2 rounded">Download Card</button>
        </div>

        <div id="card" className="w-[300px] h-[500px] relative bg-cover bg-center rounded shadow-lg" style={{ backgroundImage: `url('/card.jpeg')` }}>
          <img src="/xLogo.png" alt="#" className="absolute top-[160px] left-[77px] w-10"/>
          <div className="absolute top-[220px] left-[77px] text-slate-300 text-sm font-semibold uppercase tracking-widest w-18">{form.tagline}</div>
          <div className="absolute top-[252px] left-[77px] text-slate-300 text-[8px] font-semibold">Followers:</div>
          <div className="absolute top-[264px] left-[77px] text-slate-300 text-[6px]">{form.followers}</div>
          <div className="absolute top-[252px] right-[110px] text-slate-300 text-[8px] font-semibold">Joined:</div>
          <div className="absolute top-[264px] right-[91px] text-slate-300 text-[6px]">{form.joined}</div>
          <div className="absolute bottom-[196px] left-[77px] text-slate-300 text-[6px]">{form.username}</div>
          <div className="absolute bottom-[172px] left-[77px] text-slate-300 font-semibold text-[18px] w-36">{form.name}</div>
          <div className="absolute top-[344px] left-[77px] text-slate-300 text-[8px] font-semibold w-16">About</div>
          <div className="absolute top-[356px] left-[77px] text-slate-300 text-[6px] w-36">{form.about}</div>
          <div className="absolute bottom-[10px] right-[20px] text-slate-300 text-[6px]">@BolaJi_69</div>
          <canvas ref={qrRef} className="absolute top-[160px] right-[77px] bg-white p-1 rounded border" />
        </div>
      </div>
    </div>
  </>
  )
}
