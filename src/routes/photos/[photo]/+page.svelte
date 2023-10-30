<script lang="ts">
	import type { IfcPhoto } from '../../../interfaces/IfcPhoto';
	import type { PageData } from './$types';

	export let data: PageData;

	let photo: IfcPhoto;
	if (data.photoResponse) {
		photo = data.photoResponse;
	} else {
		console.error('No photos found');
	}
</script>

<div>
    <img class="h-full w-full" src={photo.url} alt={photo.title} />
</div>
