// ===== INTERFACES =====
interface RegulerFormData {
  name: string
  route: string
  date: string
  totalPessanger: number
}

interface CarterFormData {
  name: string
  route: string
  unit: string
  date: string
}

interface HolidayFormData {
  name: string
  holidayType: string
  unit: string
  date: string
}

export const useWhatsApp = () => {
  const config = useRuntimeConfig()
  const waNumber = config.public.waNumber

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr))
  }

  function sendRegulerBookingForm(formData: RegulerFormData) {
    let messageBody = `Halo AG Travel! Saya ingin booking travel\n\n`
    messageBody += `Tipe Travel: Reguler Travel\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Rute: ${formData.route}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`
    messageBody += `Jumlah booking: ${formData.totalPessanger} orang`

    const encodedMessage = encodeURIComponent(messageBody)
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank')
  }

  function sendCarterBookingForm(formData: CarterFormData) {
    let messageBody = `Halo AG Travel! Saya ingin booking travel\n\n`
    messageBody += `Tipe Travel: Carter\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Rute: ${formData.route}\n`
    messageBody += `Unit Kendaraan: ${formData.unit}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`

    const encodedMessage = encodeURIComponent(messageBody)
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank')
  }

  function sendHolidayTravelBooking(formData: HolidayFormData) {
    let messageBody = `Halo AG Travel! Saya ingin booking travel\n\n`
    messageBody += `Tipe Travel: Paket Wisata\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Tujuan Wisata: ${formData.holidayType}\n`
    messageBody += `Unit Kendaraan: ${formData.unit}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`

    const encodedMessage = encodeURIComponent(messageBody)
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank')
  }

  return { sendRegulerBookingForm, sendCarterBookingForm, sendHolidayTravelBooking }
}
