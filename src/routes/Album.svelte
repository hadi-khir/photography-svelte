<script lang="ts">

    export let altText: string;
    export let imgSrc: string;
    export let title: string;

</script>

<div class="w-full h-0 shadow-lg aspect-w-1 aspect-h-1 relative">
    <div>
        <img
            src={imgSrc}
            alt={altText}
            class="aspect-square w-full h-full"
        />
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold">
                {title}
            </h3>
        </div>
    </div>
</div>