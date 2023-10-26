<script>
	// Your Svelte component logic here
</script>

<div class="grid grid-cols-2 gap-4 mt-12">
	<div class="w-full h-0 shadow-lg aspect-w-1 aspect-h-1 relative">
		<div>
			<img
				src={'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Birds/american_robin.jpg'}
				alt={'American Robin in a tree'}
                class="aspect-square w-full h-full"
			/>
			<div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                <h3 class="text-xl text-white font-bold">
                    Birds
                </h3>
            </div>
		</div>
	</div>
	<div class="w-full h-0 shadow-lg aspect-w-1 aspect-h-1 relative">
		<div>
			<img
				src={'https://czlkmhdfsockxgulkjtb.supabase.co/storage/v1/object/public/photos/Cities/DSCF9352.jpg?t=2023-10-26T18%3A17%3A34.112Z'}
				alt={'Lookout tower'}
                class="aspect-square w-full h-full"
			/>
			<div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                <h3 class="text-xl text-white font-bold">
                    Around the world
                </h3>
            </div>
		</div>
	</div>
</div>
