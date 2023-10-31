<script lang="ts">
	import { onMount } from 'svelte';
    import ContentLoader from 'svelte-content-loader';

	export let altText: string;
	export let imgSrc: string;
	export let title: string;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = imgSrc;
		loading = true;
		img.onload = () => {
			loaded = true;
			loading = false;
		};
		img.onerror = () => {
			failed = true;
			loading = false;
		};
	});
</script>

{#if loaded}
	<a href={`/albums/${title}`}>
		<div
			class="w-full h-0 shadow hover:shadow-2xl aspect-w-1 aspect-h-1 relative hover:cursor-pointer"
		>
			<div class="group">
				<img
					src={imgSrc}
					alt={altText}
					class="aspect-square w-full h-full group-hover:opacity-95"
				/>
				<div
					class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 group-hover:opacity-80"
				>
					<h3 class="text-xl text-white font-bold group-hover:text-2xl">
						{title}
					</h3>
				</div>
			</div>
		</div>
	</a>
{:else if failed}
	<div>
		<p class="text-white">Failed to load image</p>
	</div>
{:else if loading}
	<ContentLoader>
		<rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
		<rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
		<rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
		<rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
		<rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
		<rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
	</ContentLoader>
{/if}
