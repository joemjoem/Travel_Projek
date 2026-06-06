// composables/useWhatsApp.ts
export interface BookingForm {
  name: string
  type: 'reguler' | 'carter' | 'tour'
  origin?: string
  destination?: string
  vehicle?: string
  tourPackage?: string // Tambahan untuk paket tour
  date: string
  passengers: number
}

export const useWhatsApp = () => {
  const WA_NUMBER = '628xxxxxxxxx' // Ganti dengan nomor asli perusahaan

  const sendBooking = (form: BookingForm) => {
    // 1. Pembuka teks
    let messageBody = `Halo Siwakerta Travel! 👋\n\n`
    messageBody += `Nama: ${form.name}\n`
    messageBody += `Layanan: ${form.type.toUpperCase()}\n`

    // 2. Kondisional berdasarkan tipe layanan (Arsitektur Teks Dinamis)
    if (form.type === 'reguler') {
      messageBody += `Rute: ${form.origin} → ${form.destination}\n`
    } else if (form.type === 'carter') {
      messageBody += `Armada: ${form.vehicle}\n`
    } else if (form.type === 'tour') {
      messageBody += `Paket Wisata: ${form.tourPackage}\n`
    }

    // 3. Penutup teks yang umum untuk semua tipe
    messageBody += `Tanggal: ${form.date}\n`
    messageBody += `Penumpang: ${form.passengers} orang\n\n`
    messageBody += `Mohon konfirmasinya mengenai ketersediaan dan harga. Terima kasih!`

    const encodedMessage = encodeURIComponent(messageBody)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank')
  }

  return { sendBooking }
}