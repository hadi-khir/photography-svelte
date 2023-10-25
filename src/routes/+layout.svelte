<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div>
  <Header/>

  <main class="max-w-screen-lg mx-auto p-4">
    <slot />
  </main>

  <footer class="flex flex-col justify-center items-center p-2">
    <p>Thanks for stopping by!</p>
  </footer>
</div>


