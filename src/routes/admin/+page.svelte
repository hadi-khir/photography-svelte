<script lang="ts">
	import exifr from 'exifr';

	let files: FileList;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
			let exifData;
			exifr
				.parse(file)
				.then((output) => {
					exifData = output;
					console.log(exifData);

					const relevantMetadata = {
						cameraMake: exifData.Make,
						cameraModel: exifData.Model,
						lens: exifData.LensModel,
						focalLength: exifData.FocalLength,
						aperture: exifData.FNumber,
						shutterSpeed: Math.round(Math.pow(2,Number(exifData.ShutterSpeedValue))),
						iso: exifData.ISO,
						dateTime: exifData.CreateDate
						// TODO: add location data by parsing gps data.                 
					};

                    console.log(relevantMetadata)
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

<label for="many" class="text-white">Upload multiple files of any type:</label>
<input class="text-white" bind:files id="many" multiple type="file" />

{#if files}
	<h2 class="text-white">Selected files:</h2>
	{#each Array.from(files) as file}
		<p class="text-white">{file.name} ({file.size} bytes)</p>
	{/each}
{/if}
