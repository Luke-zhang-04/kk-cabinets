<!--
KK Cabinets
@copyright 2020 - 2021 Luke Zhang, Ethan Lim
@author Luke Zhang, Ethan Lim

https://luke-zhang-04.github.io
https://github.com/ethanlim04

@license GPL-3.0-or-later
-->
<script lang="ts">
    import * as types from "./types"
    import * as utils from "./utils"
    import {onDestroy, onMount} from "svelte"
    import Filters from "./filters.svelte"
    import {capitalizeFirst} from "./utils"
    import {data} from "./data"

    type GalleryDataType = types.ThenArg<typeof data>["galleryData"][""]

    const urlPrefix =
        "https://firebasestorage.googleapis.com/v0/b/kk-cabinets.appspot.com/o/gallery%2F"
    const urlSuffix = "?alt=media"

    const rowSize = 3 // Columns per row
    const scrollThreshold = 10
    const chunkIncrementThreshold = 5000

    let activeFilters: types.ActiveFilters = {
        colours: [],
        materials: [],
        cabinets: undefined,
        countertop: undefined,
        pattern: undefined,
        locations: [],
    }
    let filterOptions: types.FilterOptions | undefined
    let shownChunks = 1
    let galleryDisplay: HTMLDivElement | undefined
    let galleryData: GalleryDataType[][] | undefined
    let lastChunkIncrement = Date.now()

    data.then(({filterOptions: _filterOptions, galleryData: _galleryData}) => {
        filterOptions = _filterOptions
        galleryData = utils.arrayToChunks(Object.values(_galleryData), 4)
    })

    const onScroll = (): void => {
        if (
            galleryDisplay &&
            galleryDisplay.getBoundingClientRect().bottom - window.innerHeight <=
                scrollThreshold &&
            Date.now() - lastChunkIncrement >= chunkIncrementThreshold
        ) {
            shownChunks++
            lastChunkIncrement = Date.now()
        }
    }

    const applyFilters = (): void => {
        data.then(({galleryData: _galleryData}) => {
            const filteredData: GalleryDataType[] = [] // Filtered data

            for (const item of Object.values(_galleryData)) {
                let isFiltered = false

                for (const filter of types.filterTypes) {
                    // Make sure the filters don't catch this item
                    if (
                        activeFilters[`${filter}s` as types.FilterKeys].includes(
                            item.details[filter],
                        )
                    ) {
                        isFiltered = true

                        break
                    }
                }

                if (
                    isFiltered ||
                    (activeFilters.pattern !== undefined &&
                        item.details.pattern !== activeFilters.pattern)
                ) {
                    continue
                } else if (
                    activeFilters.countertop !== undefined &&
                    activeFilters.cabinets !== undefined
                ) {
                    const didMatch =
                        item.details.furniture.countertop !== activeFilters.countertop ||
                        item.details.furniture.cabinet !== activeFilters.cabinets

                    if (didMatch) {
                        continue
                    }
                }

                filteredData.push(item)
            }

            galleryData = utils.arrayToChunks(filteredData, 4)
        })
    }

    const onImageClick: svelte.JSX.MouseEventHandler<HTMLImageElement> = (event) => {
        if (event.target instanceof HTMLElement) {
            const container = event.target?.parentNode?.querySelector<HTMLElement>(".details")

            if (container?.style.maxHeight) {
                container.style.maxHeight = ""
            } else if (container) {
                container.style.maxHeight = `${container.scrollHeight}px`
            }
        }
    }

    onMount(() => {
        window.addEventListener("scroll", onScroll)
    })

    onDestroy(() => {
        window.removeEventListener("scroll", onScroll)
    })
</script>

{#if filterOptions}
    <Filters
        {filterOptions}
        on:filterApply={({detail: filters}) => {
            activeFilters = filters

            applyFilters()
        }}
    />
{/if}

{#if galleryData}
    <div class="responive_row" id="row" bind:this={galleryDisplay}>
        {#each galleryData as items (items.map(({id}) => id))}
            <div class="responsive_column">
                {#each items.slice(0, shownChunks * rowSize) as item (item.id)}
                    <div class="image_container">
                        <img
                            src={`${urlPrefix}${item.file}${urlSuffix}`}
                            alt={`gallery item ${item.id}`}
                            on:click={onImageClick}
                        />
                        <div class="details">
                            <p>
                                <br />Colour: {capitalizeFirst(item.details.colour)}
                                <br />Furniture: {(() => {
                                    if (
                                        item.details.furniture.countertop &&
                                        item.details.furniture.cabinet
                                    ) {
                                        return "Countertop and Cabinets"
                                    }

                                    return item.details.furniture.cabinet
                                        ? "Cabinet"
                                        : "Countertop"
                                })()}
                                <br />Location: {capitalizeFirst(item.details.location)}
                                <br />Material: {capitalizeFirst(item.details.material)}
                                <br />Pattern: {item.details.pattern ? "Yes" : "None"}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{:else}
    <div class="spinner-border" id="loading" role="status">
        <span class="sr-only">Loading...</span>
    </div>
{/if}
