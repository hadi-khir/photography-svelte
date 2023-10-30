<script lang="ts">
    
	import type { IfcPhoto } from '../../../interfaces/IfcPhoto';
	
	export let photo: IfcPhoto;
	
	const getPhotoInfo = (photo: IfcPhoto) => {
		return {
			imgSrc: photo.thumbnail,
			altText: photo.title,
			id: photo.id,
		};
	}
</script>

<div>
	<a href="/photos/{getPhotoInfo(photo).id}">
		<img
			class="hover:scale-110 transition duration-500 cursor-pointer h-64 w-96"
			src={getPhotoInfo(photo).imgSrc}
			alt={getPhotoInfo(photo).altText}
		/>
	</a>
</div>
