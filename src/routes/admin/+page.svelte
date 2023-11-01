<script lang="ts">
	import exifr from 'exifr';
	let files: FileList;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
			exifr.parse(file).then((output) => console.log(output));
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
