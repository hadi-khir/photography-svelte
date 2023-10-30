<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="flex flex-col min-h-screen bg-gray-900">
  <Header/>

  <main class="flex-1 container mx-auto p-4">
    <slot />
  </main>

  <footer class="text-center py-4 text-white">
    <p>Thanks for stopping by!</p>
  </footer>
</div>


