<script lang="ts">
	import Album from './Album.svelte';

	//TODO: call db to get album details
	const albumResponse = [
		{
			altText: 'European Starlings on windvine',
			imgSrc:
				'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Birds/european_starlings.jpg',
			title: 'Birds'
		},
		{
			altText: 'Lookout tower',
			imgSrc:
				'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Cities/DSCF9352.jpg?t=2023-10-26T18%3A17%3A34.112Z',
			title: 'Around the world'
		}
	];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
	{#each albumResponse as album}
		<Album altText={album.altText} imgSrc={album.imgSrc} title={album.title} />
	{/each}
</div>
