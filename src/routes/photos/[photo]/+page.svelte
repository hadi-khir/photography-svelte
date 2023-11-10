<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ContentLoader from 'svelte-content-loader';

	export let data: PageData;

	let photo: IPhoto;
	let metadata: IMetadata;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = photo.url;
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

	if (data.photo && data.photo.metadata) {
		photo = data.photo as IPhoto;
		metadata = data.photo.metadata as IMetadata;
	} else {
		console.error('No photo found');
	}
</script>

{#if loaded}
	<div>
		<img class="h-full w-full" src={photo.url} alt={metadata.title} />
		<div class="bg-black bg-opacity-50 text-white p-2">
			<h1 class="text-xl">{metadata.title}</h1>
			<p class="text-sm">{metadata.make + " " + metadata.model}</p>
			<p class="text-sm">{metadata.lens}</p>
			<p class="text-sm">Aperture: {metadata.aperture}mm</p>
			<p class="text-sm">Focal Length: f/{metadata.focalLength}</p>
			<p class="text-sm">ISO: {metadata.iso}</p>
			<p class="text-sm">Shutter Speed: 1/{metadata.shutterSpeed} seconds</p>
		</div>
	</div>
{:else if failed}
	<div>
		<p class="text-white">Failed to load image</p>
	</div>
{:else if loading}
	<ContentLoader>
		<rect x="0" y="0" rx="3" ry="3" width="2500" height="100" />
		<rect x="20" y="20" rx="3" ry="3" width="2200" height="100" />
		<rect x="20" y="40" rx="3" ry="3" width="1700" height="100" />
		<rect x="0" y="60" rx="3" ry="3" width="2500" height="100" />
		<rect x="20" y="80" rx="3" ry="3" width="2000" height="100" />
		<rect x="20" y="100" rx="3" ry="3" width="800" height="100" />
	</ContentLoader>
{/if}
