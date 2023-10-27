<script lang="ts">
	import type { IfcAlbum } from '../interfaces/IfcAlbum';
	import type { PageData } from './$types';
	import Album from './Album.svelte';

	export let data: PageData;

	const getAlbumCoverInfo = (album: IfcAlbum) => {

		const albumPhoto = album.photos.at(0);
		if (albumPhoto) {
			return {
				imgSrc: albumPhoto.thumbnail,
				altText: albumPhoto.title,
			};
		}
		
		console.log('No album cover photo found, returning empty info');
		return {
			imgSrc: '',
			altText: '',
		};
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
	{#each data.albums as album}
		<Album altText={getAlbumCoverInfo(album).altText} imgSrc={getAlbumCoverInfo(album).imgSrc} title={album.title} />
	{/each}
</div>
