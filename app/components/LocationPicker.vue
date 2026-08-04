<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { Map, Marker, LeafletMouseEvent } from 'leaflet'

/**
 * LocationPicker.vue
 *
 * Komponen peta untuk memilih titik jemput/turun.
 * - User bisa search alamat (via Nominatim/OpenStreetMap, gratis tanpa API key)
 * - Pilih salah satu hasil -> peta pindah ke titik itu + marker muncul
 * - User juga bisa klik langsung di peta untuk pindah marker manual
 * - Emit hasil ke parent: { lat, lng, address }
 *
 * Catatan: harga TIDAK dihitung dari hasil ini. Komponen ini hanya
 * mengembalikan koordinat + nama alamat untuk dikirim sebagai info
 * tambahan ke pesan WhatsApp (link Google Maps), bukan untuk parsing
 * otomatis penentuan kota/kecamatan.
 */

interface LocationResult {
  lat: number
  lng: number
  address: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: LocationResult | null
    placeholder?: string
    defaultCenter?: [number, number] // [lat, lng] - default Malang
  }>(),
  {
    modelValue: null,
    placeholder: 'Cari alamat jemput/turun...',
    defaultCenter: () => [-7.9666, 112.6326] // Malang
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: LocationResult | null]
  'locationSelected': [value: LocationResult]
}>()

// ===== INTEGRASI KE SISTEM FORM NUXT UI =====
// Tanpa ini, UForm tidak pernah tahu bahwa field pickupLocation/dropoffLocation
// berubah, jadi error yang sudah tampil tidak akan hilang sampai form di-submit ulang.
const { emitFormChange } = useFormField()

// ===== STATE =====
const searchQuery = ref('')
const searchResults = ref<{ display_name: string, lat: string, lon: string }[]>(
  []
)
const isSearching = ref(false)
const showResults = ref(false)
const selectedLocation = ref<LocationResult | null>(props.modelValue)

const mapContainer = ref<HTMLElement | null>(null)
const searchBoxRef = ref<HTMLElement | null>(null)
// PENTING: pakai shallowRef, BUKAN ref, untuk instance class pihak ketiga
// (Leaflet Map/Marker). Kalau pakai ref biasa, Vue melewatkan tipe ini lewat
// UnwrapRef, yang merekonstruksi ulang objeknya dan MENGHILANGKAN properti
// protected internal Leaflet (_map, _shadow, dst). Akibatnya tipe hasil
// rekonstruksi tidak lagi cocok secara struktural dengan tipe asli Map/Marker
// dari @types/leaflet, dan setiap kali map.value / marker.value dioper ke
// method Leaflet lain (removeLayer, addTo, dst) TypeScript menolaknya.
// shallowRef tidak melewati UnwrapRef sehingga tipe aslinya tetap utuh, dan
// sekaligus lebih tepat: kita tidak pernah butuh Vue reaktif ke properti
// internal Leaflet, hanya perlu tahu kapan .value diganti.
const map = shallowRef<Map | null>(null)
const marker = shallowRef<Marker | null>(null)

// Leaflet di-load client-side only (dynamic import), jadi tipenya
// `typeof import("leaflet") | null`, BUKAN `unknown`. Ini penting:
// kalau dibiarkan `unknown`, setiap L.marker(...)/L.tileLayer(...)/
// L.Icon... akan gagal typecheck (TS18046 / TS2571).
let L: typeof import('leaflet') | null = null

// ===== SYNC DARI PARENT =====
// Sebelumnya selectedLocation cuma diisi sekali saat mount dari props.modelValue,
// tidak pernah disinkronkan ulang. Akibatnya kalau parent me-reset
// state.pickupLocation jadi null (misal user ganti kota asal Malang -> Blitar,
// komponen ini TIDAK unmount karena keduanya sama-sama needsPicker), preview
// alamat lama tetap tampil padahal datanya sudah null di parent.
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal && selectedLocation.value) {
      selectedLocation.value = null
      searchQuery.value = ''

      // FIX: kondisi lama `if (marker && map)` SELALU true karena `marker`
      // dan `map` di sini adalah objek ref itu sendiri (selalu truthy),
      // bukan `.value`-nya. Harus cek `.value` masing-masing, bukan ref-nya.
      if (marker.value && map.value) {
        map.value.removeLayer(marker.value)
        marker.value = null
      }
    } else if (
      newVal
      && (!selectedLocation.value
        || newVal.lat !== selectedLocation.value.lat
        || newVal.lng !== selectedLocation.value.lng)
    ) {
      selectedLocation.value = newVal
      searchQuery.value = newVal.address
    }
  }
)

// ===== SEARCH (Nominatim - OpenStreetMap, gratis tanpa API key) =====
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)

  if (searchQuery.value.trim().length < 3) {
    searchResults.value = []
    showResults.value = false
    return
  }

  // Debounce 500ms supaya tidak spam request tiap ketikan
  searchTimeout = setTimeout(async () => {
    await performSearch(searchQuery.value)
  }, 500)
}

async function performSearch(query: string) {
  isSearching.value = true
  try {
    // Viewbox kasar yang mencakup Jawa Timur (termasuk Malang, Blitar, Surabaya)
    // Format viewbox: left(lon_min),top(lat_max),right(lon_max),bottom(lat_min)
    const jatimViewbox = '110.0,-6.5,114.5,-8.8'

    const url
      = `https://nominatim.openstreetmap.org/search?`
        + `q=${encodeURIComponent(query)}`
        + `&format=json`
        + `&countrycodes=id`
        + `&limit=5`
        + `&addressdetails=1`
        + `&viewbox=${jatimViewbox}`
        + `&bounded=1` // 1 = hasil WAJIB di dalam viewbox, bukan sekadar prioritas

    const res = await fetch(url, {
      headers: {
        // Nominatim usage policy mewajibkan identifikasi aplikasi
        'Accept-Language': 'id'
      }
    })

    if (!res.ok) throw new Error('Gagal mencari alamat')

    const data = await res.json()
    searchResults.value = data
    showResults.value = true
  } catch (err) {
    console.error('[LocationPicker] performSearch gagal:', err)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

// ===== SELECT RESULT =====
function selectResult(result: {
  display_name: string
  lat: string
  lon: string
}) {
  const lat = parseFloat(result.lat)
  const lng = parseFloat(result.lon)

  setLocation(lat, lng, result.display_name)

  searchQuery.value = result.display_name
  showResults.value = false
  searchResults.value = []
}

// Helper terpusat supaya listener "dragend" tidak diduplikasi 3x
// (search select, klik peta, init mount) dengan risiko salah satu
// lupa di-update saat maintenance.
function attachDragEndListener(m: Marker) {
  m.on('dragend', async () => {
    const pos = m.getLatLng()
    await reverseGeocode(pos.lat, pos.lng)
  })
}

// ===== SET LOCATION (dipakai dari search maupun klik peta) =====
function setLocation(lat: number, lng: number, address: string) {
  selectedLocation.value = { lat, lng, address }

  if (map.value && L) {
    map.value.setView([lat, lng], 15)

    if (marker.value) {
      marker.value.setLatLng([lat, lng])
    } else {
      marker.value = L.marker([lat, lng], { draggable: true }).addTo(map.value)
      attachDragEndListener(marker.value)
    }
  }

  emit('update:modelValue', selectedLocation.value)
  emit('locationSelected', selectedLocation.value)
  emitFormChange()
}

// Reverse geocode dipakai HANYA saat user klik/drag manual di peta
// (untuk dapat nama alamat dari titik yang dipilih)
async function reverseGeocode(lat: number, lng: number) {
  try {
    const url
      = `https://nominatim.openstreetmap.org/reverse?`
        + `lat=${lat}&lon=${lng}&format=json&addressdetails=1`

    const res = await fetch(url, {
      headers: { 'Accept-Language': 'id' }
    })

    if (!res.ok) throw new Error('Gagal mendapatkan alamat')

    const data = await res.json()
    const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`

    selectedLocation.value = { lat, lng, address }
    searchQuery.value = address

    emit('update:modelValue', selectedLocation.value)
    emit('locationSelected', selectedLocation.value)
    emitFormChange()
  } catch (err) {
    console.error('[LocationPicker] reverseGeocode gagal:', err)
    // Fallback: tetap simpan koordinat meski nama alamat gagal didapat
    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    selectedLocation.value = { lat, lng, address: fallbackAddress }
    searchQuery.value = fallbackAddress
    emit('update:modelValue', selectedLocation.value)
    emitFormChange()
  }
}

// ===== INIT MAP (client-side only) =====
onMounted(async () => {
  if (typeof window === 'undefined') return

  // Dynamic import supaya tidak error saat SSR
  const leafletModule = await import('leaflet')
  L = leafletModule.default
  await import('leaflet/dist/leaflet.css')

  // Fix icon default Leaflet yang sering broken di bundler.
  // Cast lewat objek intermediate, bukan ke `unknown` mentah, supaya
  // masih ada type-checking pada properti yang benar-benar dipakai.
  const iconDefault = L.Icon.Default.prototype as unknown as {
    _getIconUrl?: unknown
  }
  delete iconDefault._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  })

  if (!mapContainer.value) return

  const initialCenter: [number, number] = selectedLocation.value
    ? [selectedLocation.value.lat, selectedLocation.value.lng]
    : props.defaultCenter

  map.value = L.map(mapContainer.value).setView(initialCenter, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value)

  // Kalau sudah ada lokasi awal (dari v-model), tampilkan marker
  if (selectedLocation.value) {
    marker.value = L.marker(initialCenter, { draggable: true }).addTo(
      map.value
    )
    attachDragEndListener(marker.value)
  }

  // Klik di peta -> pindah/buat marker + reverse geocode untuk dapat nama alamat
  map.value.on('click', async (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng

    if (marker.value) {
      marker.value.setLatLng([lat, lng])
    } else if (L && map.value) {
      marker.value = L.marker([lat, lng], { draggable: true }).addTo(map.value)
      attachDragEndListener(marker.value)
    }

    await reverseGeocode(lat, lng)
  })

  // Tutup dropdown hasil search kalau klik di luar search box.
  onClickOutside(searchBoxRef, () => {
    showResults.value = false
  })
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<template>
  <div class="w-full space-y-2">
    <!-- Search Box -->
    <div
      ref="searchBoxRef"
      class="relative"
    >
      <UInput
        v-model="searchQuery"
        :placeholder="placeholder"
        icon="i-lucide-search"
        class="w-full"
        @input="onSearchInput"
        @focus="
          () => {
            if (searchResults.length) showResults = true;
          }
        "
      >
        <template
          v-if="isSearching"
          #trailing
        >
          <UIcon
            name="i-lucide-loader-2"
            class="w-4 h-4 animate-spin text-slate-400"
          />
        </template>
      </UInput>

      <!-- Dropdown hasil search -->
      <div
        v-if="showResults && searchResults.length > 0"
        class="absolute z-[1000] top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto"
      >
        <button
          v-for="(result, i) in searchResults"
          :key="i"
          type="button"
          class="w-full text-left px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-0 flex items-start gap-2"
          @click="selectResult(result)"
        >
          <UIcon
            name="i-lucide-map-pin"
            class="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400"
          />
          <span class="line-clamp-2">{{ result.display_name }}</span>
        </button>
      </div>

      <!-- Pesan kalau tidak ada hasil -->
      <div
        v-if="
          showResults
            && !isSearching
            && searchResults.length === 0
            && searchQuery.length >= 3
        "
        class="absolute z-[1000] top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-3 text-sm text-slate-400 text-center"
      >
        Alamat tidak ditemukan di area Malang/Blitar/Surabaya. Coba kata kunci
        lain atau klik langsung di peta.
      </div>
    </div>

    <!-- Map Container -->
    <div
      ref="mapContainer"
      class="w-full h-64 rounded-lg border border-slate-200 z-0"
    />

    <!-- Hint -->
    <p class="text-xs text-slate-400 flex items-center gap-1">
      <UIcon
        name="i-lucide-info"
        class="w-3.5 h-3.5 flex-shrink-0"
      />
      Cari alamat, atau klik/geser pin langsung di peta untuk titik lebih
      presisi.
    </p>

    <!-- Selected Location Preview -->
    <div
      v-if="selectedLocation"
      class="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2"
    >
      <UIcon
        name="i-lucide-map-pin-check"
        class="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600"
      />
      <p class="text-xs text-emerald-800 line-clamp-2">
        {{ selectedLocation.address }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Pastikan tile peta tidak ketutupan elemen lain (z-index Leaflet default 1-400) */
:deep(.leaflet-container) {
  font-family: inherit;
}
</style>
