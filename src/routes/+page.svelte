<script lang="ts">
	import type { PageData } from './$types';
	import Album from './Album.svelte';

	export let data: PageData;
	const albums = data.albums as IAlbum[];

	const getAlbumCoverInfo = (album: IAlbum) => {

		const albumPhoto = album.photos.at(0);
		if (albumPhoto && albumPhoto.metadata) {
			return {
				imgSrc: albumPhoto.thumbnail,
				altText: albumPhoto.metadata.title
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
	{#each albums as album}
		<Album altText={getAlbumCoverInfo(album).altText} imgSrc={getAlbumCoverInfo(album).imgSrc} title={album.title} />
	{/each}
</div>
