<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="flex flex-col min-h-screen">

  <Header/>

  <main class="flex-1 flex flex-col p-4 max-w-screen-lg mx-auto">
    <slot />
  </main>

  <footer class="flex flex-col justify-center items-center p-2">
    <p>Thanks for stopping by!</p>
  </footer>
</div>


