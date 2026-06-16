<template>
  <div>
    <HeroSection @open-booking="isOpen = true" />
    <ServiceFeatures />
    <PricingSection />
    <BookingSteps />
    <FleetsGalery />
    <ReasonChooseUse />
    <TestimoniSection />

    <FaqSection />
  </div>
</template>

<script setup>
const isOpen = ref(false)
</script>
