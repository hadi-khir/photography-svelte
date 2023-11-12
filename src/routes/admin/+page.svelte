<script lang="ts">
	import exifr from 'exifr';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';

	let files: FileList;
	let payload: { fileName: string; metadata: {} }[] = [];
	export let data: PageData;
	let albumNames: { label: string; value: string }[] = [];
	let inputValue = '';
	let albumOptions: AutocompleteOption<string>[] = [];
	let formLoading = false;

	$: if (files) {
		for (const file of files) {
			let exifData;
			exifr
				.parse(file)
				.then((output) => {
					exifData = output;

					const relevantMetadata = {
						make: exifData.Make,
						model: exifData.Model,
						lens: exifData.LensModel,
						focalLength: exifData.FocalLength,
						aperture: exifData.FNumber,
						shutterSpeed: Math.round(Math.pow(2, Number(exifData.ShutterSpeedValue))),
						iso: exifData.ISO,
						captureDate: exifData.CreateDate,
						caption: exifData.ImageDescription,
						title: file.name.replace(/_/g, ' ').replace(/\..+$/, '')
					};

					payload.push({
						fileName: file.name,
						metadata: relevantMetadata
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	onMount(() => {
		if (data.albumResponse) {
			albumNames = data.albumResponse.map((album) => ({ label: album.title, value: album.title }));
			albumOptions = albumNames;
		}
	});

	async function addImages(event: Event) {
		formLoading = true;
		const formEl = event.target as HTMLFormElement;
		const formData = new FormData(formEl);
		formData.append('metadata', JSON.stringify(payload));

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: formData
		}).then((res) => {
			res.json();
			formLoading = false;
		});
	}

	function onAlbumSelect(event: CustomEvent<AutocompleteOption<string>>): void {
		inputValue = event.detail.label;
	}

	const env = process.env.NODE_ENV;
</script>

{#if env !== 'development'}
	<h1 class="text-2xl font-bold">Get outta here!</h1>
{:else if formLoading}
	<div class="w-full max-w-xl bg-white shadow-md rounded">
		<h1 class="text-2xl font-bold">Loading...</h1>
	</div>
{:else}
	<div class="w-full max-w-xl">
		<form
			class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			on:submit|preventDefault={addImages}
			method="POST"
		>
			<input
				class="input"
				type="search"
				name="album"
				bind:value={inputValue}
				placeholder="Select an Album..."
			/>
			<Autocomplete bind:input={inputValue} options={albumOptions} on:selection={onAlbumSelect} />
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
{/if}
