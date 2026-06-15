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
    <!--
    <UModal v-model="isOpen">
      <div class="p-6">
        <BookingWidget />
      </div>
    </UModal> -->
  </div>
</template>

<script setup>
const isOpen = ref(false)
</script>
