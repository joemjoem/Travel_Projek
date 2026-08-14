// ===== INTERFACES =====
interface RegulerFormData {
  name: string
  originLabel: string
  destLabel: string
  date: string
  totalPessanger: number
  pickupLocation: { address: string | null, lat: number | null, lng: number | null } | null
  dropoffLocation: { address: string | null, lat: number | null, lng: number | null } | null
}

interface CarterFormData {
  name: string
  pickupLabel: string
  route: string
  date: string
  unitType: string
  pickupLocation: { address: string | null, lat: number | null, lng: number | null } | null
  dropoffLocation: { address: string | null, lat: number | null, lng: number | null } | null
}

interface HolidayFormData {
  name: string
  holidayType: string
  unit: string
  date: string
  pickupLocation: { address: string | null, lat: number | null, lng: number | null } | null
}

export const useWhatsApp = () => {
  const config = useRuntimeConfig()
  const waNumber = computed(() => {
    const phone = config.public.waNumber
    if (!phone) return ''

    if (phone.startsWith('0')) {
      return '62' + phone.slice(1)
    }

    return phone
  })
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
    window.open(`https://wa.me/${waNumber.value}?text=${message}`, '_blank')
  }

  function sendMessageToAdmin() {
    const defaultMessage = `Halo, saya ada pertanyaan terkait layanan ${travelName}.`
    sendMessage(encodeURIComponent(defaultMessage))
  }

  function generateMapsUrl(lat: number | null, lng: number | null) {
    return `https://maps.google.com/?q=${lat},${lng}`
  }

  function sendRegulerBookingForm(formData: RegulerFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Reguler Travel\n\n`
    messageBody += `Nama: ${formData.name}\n\n`

    messageBody += `Titik Penjemputan: ${formData.originLabel}\n\n`
    if (formData.pickupLocation) {
      messageBody += `Alamat: ${formData.pickupLocation.address || '-'}\n\n`
      messageBody += `link: ${generateMapsUrl(formData.pickupLocation.lat, formData.pickupLocation.lng)}\n\n`
    }

    messageBody += `Titik Tujuan: ${formData.destLabel}\n\n`
    if (formData.dropoffLocation) {
      messageBody += `Alamat: ${formData.dropoffLocation.address || '-'}\n\n`
      messageBody += `link: ${generateMapsUrl(formData.dropoffLocation.lat, formData.dropoffLocation.lng)}\n\n`
    }

    messageBody += `Tanggal: ${formatDate(formData.date)}\n\n`
    messageBody += `Jumlah booking: ${formData.totalPessanger} orang`

    sendMessage(encodeURIComponent(messageBody))
  }

  function sendCarterBookingForm(formData: CarterFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Carter\n\n`
    messageBody += `Nama: ${formData.name}\n\n`

    messageBody += `Titik Penjemputan: ${formData.pickupLabel}\n\n`
    if (formData.pickupLocation) {
      messageBody += `Alamat: ${formData.pickupLocation.address || '-'}\n\n`
      messageBody += `link: ${generateMapsUrl(formData.pickupLocation.lat, formData.pickupLocation.lng)}\n\n`
    }

    messageBody += `Rute: ${formData.route}\n\n`
    if (formData.dropoffLocation) {
      messageBody += `Alamat: ${formData.dropoffLocation.address || '-'}\n\n`
      messageBody += `link: ${generateMapsUrl(formData.dropoffLocation.lat, formData.dropoffLocation.lng)}\n\n`
    }
    messageBody += `Unit Kendaraan: ${formData.unitType}\n\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n\n`

    sendMessage(encodeURIComponent(messageBody))
  }

  function sendHolidayTravelBooking(formData: HolidayFormData) {
    let messageBody = `${defaultOpeningMessage}\n\n`
    messageBody += `Tipe Travel: Paket Wisata\n\n`
    messageBody += `Nama: ${formData.name}\n\n`

    if (formData.pickupLocation) {
      messageBody += `Alamat Penjemputan: ${formData.pickupLocation.address || '-'}\n\n`
      messageBody += `link: ${generateMapsUrl(formData.pickupLocation.lat, formData.pickupLocation.lng)}\n\n`
    }

    messageBody += `Tujuan Wisata: ${formData.holidayType}\n\n`
    messageBody += `Unit Kendaraan: ${formData.unit}\n\n`
    messageBody += `Tanggal: ${formatDate(formData.date)}\n\n`

    sendMessage(encodeURIComponent(messageBody))
  }

  return { sendMessageToAdmin, sendRegulerBookingForm, sendCarterBookingForm, sendHolidayTravelBooking }
}
