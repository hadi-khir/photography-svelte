<script lang="ts">
	import type { IfcMetadata } from '../../../interfaces/IfcMetadata';
	import type { IfcPhoto } from '../../../interfaces/IfcPhoto';
	import type { PageData } from './$types';

	export let data: PageData;

	let photo: IfcPhoto;
	let metadata: IfcMetadata;
	if (data.photoResponse && data.photoResponse.metadata) {
		photo = data.photoResponse;
		metadata = data.photoResponse.metadata;
	} else {
		console.error('No photos found');
	}
</script>

<div>
    <img class="h-full w-full" src={photo.url} alt={photo.title} />
	<div class="bg-black bg-opacity-50 text-white p-2">
		<h1 class="text-xl">{metadata.title}</h1>
		<p class="text-sm">{metadata.camera}</p>
		<p class="text-sm">{metadata.lens}</p>
		<p class="text-sm">{metadata.aperture}</p>
		<p class="text-sm">{metadata.focalLength}</p>
		<p class="text-sm">{metadata.iso}</p>
		<p class="text-sm">{metadata.shutterSpeed}</p>
		<p class="text-sm">{metadata.captureDate}</p>
		<p class="text-sm">{metadata.location}</p>
		<p class="text-sm">{metadata.city}</p>
		<p class="text-sm">{metadata.province}</p>
		<p class="text-sm">{metadata.country}</p>
	</div>
</div>
