<script lang="ts">
    
	import type { IfcPhoto } from '../../../interfaces/IfcPhoto';
	
	export let photo: IfcPhoto;
	
	const getPhotoInfo = (photo: IfcPhoto) => {
		return {
			imgSrc: photo.thumbnail,
			altText: photo.title,
		};
	}
</script>

<div>
	<a href="/photos/id">
		<img
			class="hover:scale-110 transition duration-500 cursor-pointer"
			src={getPhotoInfo(photo).imgSrc}
			alt={getPhotoInfo(photo).altText}
		/>
	</a>
</div>
