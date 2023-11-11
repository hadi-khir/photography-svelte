<script lang="ts">
	import GalleryImage from './GalleryImage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let photos: IPhoto[];
	if (data.albumResponse && data.albumResponse.photos) {
		photos = data.albumResponse.photos as IPhoto[];
	} else {
		console.error('No photos found');
		photos = [];
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
	{#each photos as photo}
		<GalleryImage photo={photo} />
	{/each}
</div>
