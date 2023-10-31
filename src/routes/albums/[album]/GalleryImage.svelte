<script lang="ts">
	import { onMount } from 'svelte';
	import ContentLoader from 'svelte-content-loader';

	export let photo: IPhoto;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = photo.url;
		loading = true;
		img.onload = () => {
			loaded = true;
			loading = false;
		};
		img.onerror = () => {
			failed = true;
			loading = false;
		};
	});

	const getPhotoInfo = (photo: IPhoto) => {
		return {
			imgSrc: photo.thumbnail,
			altText: photo.title,
			id: photo.id
		};
	};
</script>

{#if loaded}
	<div>
		<a href="/photos/{getPhotoInfo(photo).id}">
			<img
				class="hover:scale-110 transition duration-500 cursor-pointer h-64 w-96"
				src={getPhotoInfo(photo).imgSrc}
				alt={getPhotoInfo(photo).altText}
			/>
		</a>
	</div>
{:else if failed}
	<div>
		<p class="text-white">Failed to load image</p>
	</div>
{:else if loading}
	<ContentLoader>
		<rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
		<rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
		<rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
		<rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
		<rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
		<rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
	</ContentLoader>
{/if}
