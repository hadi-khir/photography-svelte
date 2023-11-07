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
						shutterSpeed: Math.round(Math.pow(2, Number(exifData.ShutterSpeedValue))),
						iso: exifData.ISO,
						dateTime: exifData.CreateDate
						// TODO: add location data by parsing gps data.
					};

					console.log(relevantMetadata);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

<div class="w-full max-w-xl">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="many">
				Upload Images:
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				bind:files
				id="many"
				multiple
				type="file"
				accept="image/*"
				name="images"
			/>
		</div>
		<div class="mb-6">
			{#if files}
				<h2 class="block text-gray-700 font-bold mb-2">Selected files:</h2>
				{#each Array.from(files) as file}
					<p class="block text-gray-700 text-sm font-bold mb-2">
						{file.name} ({file.size} bytes)
					</p>
				{/each}
			{/if}
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Upload
			</button>
		</div>
	</form>
</div>
