<script>
	// Your Svelte component logic here

	import Album from "./Album.svelte";

</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
	<Album 
		altText={'European Starlings on windvine'} 
		imgSrc={'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Birds/european_starlings.jpg'}
		title={'Birds'} />

	<Album 
	altText={'Lookout tower'} 
	imgSrc={'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Cities/DSCF9352.jpg?t=2023-10-26T18%3A17%3A34.112Z'}
	title={'Around the world'} />
</div>
