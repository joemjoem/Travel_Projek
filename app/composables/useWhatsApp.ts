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
  const travelName = config.public.travelName
  const defaultOpeningMessage = `Halo ${travelName}! Saya ingin booking travel`

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr))
  }

  function sendMessage(message: string) {
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank')
  }

  function sendMessageToAdmin() {
    const defaultMessage = `Halo, saya ada pertanyaan terkait layanan ${travelName}.`
    sendMessage(encodeURIComponent(defaultMessage))
  }

  function sendRegulerBookingForm(formData: RegulerFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Reguler Travel\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Rute: ${formData.route}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`
    messageBody += `Jumlah booking: ${formData.totalPessanger} orang`

    sendMessage(encodeURIComponent(messageBody))
  }

  function sendCarterBookingForm(formData: CarterFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Carter\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Rute: ${formData.route}\n`
    messageBody += `Unit Kendaraan: ${formData.unit}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`

    sendMessage(encodeURIComponent(messageBody))
  }

  function sendHolidayTravelBooking(formData: HolidayFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Paket Wisata\n`
    messageBody += `Nama: ${formData.name}\n`
    messageBody += `Tujuan Wisata: ${formData.holidayType}\n`
    messageBody += `Unit Kendaraan: ${formData.unit}\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n`

    sendMessage(encodeURIComponent(messageBody))
  }

  return { sendMessageToAdmin, sendRegulerBookingForm, sendCarterBookingForm, sendHolidayTravelBooking }
}
