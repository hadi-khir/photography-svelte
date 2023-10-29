<script lang="ts">
	import GalleryImage from './GalleryImage.svelte';
	import type { PageData } from './$types';
	import type { IfcPhoto } from '../../../interfaces/IfcPhoto';

	export let data: PageData;

	let photos: IfcPhoto[];
	if (data.albumResponse && data.albumResponse.photos) {
		photos = data.albumResponse.photos;
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
