<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let photo: IPhoto;
	let metadata: IMetadata;
	if (data.photo && data.photo.metadata) {
		photo = data.photo;
		metadata = data.photo.metadata;
	} else {
		console.error('No photo found');
	}
</script>

<div>
	<img class="h-full w-full" src={photo.url} alt={metadata.title} />
	<div class="bg-black bg-opacity-50 text-white p-2">
		<h1 class="text-xl">{metadata.title}</h1>
		<p class="text-sm">{metadata.camera?.model}</p>
		<p class="text-sm">{metadata.lens?.name}</p>
		<p class="text-sm">Aperture: {metadata.aperture}mm</p>
		<p class="text-sm">Focal Length: f/{metadata.focalLength}</p>
		<p class="text-sm">ISO: {metadata.iso}</p>
		<p class="text-sm">Shutter Speed: 1/{metadata.shutterSpeed} seconds</p>
		<p class="text-sm">{metadata.captureDate}</p>
		<p class="text-sm">{metadata.city}, {metadata.province}, {metadata.country}</p>
	</div>
</div>
