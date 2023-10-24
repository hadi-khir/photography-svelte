<script>
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header class="flex flex-col justify-center items-center p-2">
        <nav>
            <div class="container mx-auto">
              <div class="flex justify-between items-center">
                <ul class="flex space-x-4">
                  <li><a href="/" class="text-black">Home</a></li>
                  <li><a href="/about" class="text-black">About</a></li>
                  <li><a href="/services" class="text-black">Services</a></li>
                  <li><a href="/contact" class="text-black">Contact</a></li>
                </ul>
              </div>
            </div>
          </nav>
	</header>

	<main class="flex-1 flex flex-col p-4 max-w-screen-lg mx-auto">
		<slot />
	</main>

	<footer class="flex flex-col justify-center items-center p-2">
		<p>Thanks for stopping by!</p>
	</footer>
</div>
