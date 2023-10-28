<script lang="ts">

    export let altText: string;
    export let imgSrc: string;
    export let title: string;

</script>

<a href={`/albums/${title}`}>
    <div class="w-full h-0 shadow hover:shadow-2xl aspect-w-1 aspect-h-1 relative hover:cursor-pointer">
        <div class="group">
            <img
                src={imgSrc}
                alt={altText}
                class="aspect-square w-full h-full group-hover:opacity-95"
            />
            <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 group-hover:opacity-80">
                <h3 class="text-xl text-white font-bold group-hover:text-2xl">
                    {title}
                </h3>
            </div>
        </div>
    </div>
</a>