<!-- This file is an absolute monstrosity -->
<script lang="ts">
    import * as types from "./types"
    import {capitalizeFirst} from "./utils"
    import {createEventDispatcher} from "svelte"

    export let filterOptions: types.FilterOptions
    export let shouldAutoApplyFilters: boolean = true

    let activeFilters: types.ActiveFilters = {
        colours: [],
        materials: [],
        cabinets: undefined,
        countertop: undefined,
        pattern: undefined,
        locations: [],
    }

    const dispatch = createEventDispatcher<{filterApply: types.ActiveFilters}>()

    const handleFilterType = (filter: string): string =>
        capitalizeFirst(filter === "location" ? "location" : `${filter}s`)

    // Workaround for typescript
    const appendS = <T extends string>(str: T): `${T}s` => `${str}s`

    const onFilterApply = (): void => dispatch("filterApply", activeFilters)

    const onFilterExpand: svelte.JSX.MouseEventHandler<HTMLButtonElement> = ({target}) => {
        if (target instanceof window.HTMLElement && target.parentElement) {
            const filterElement =
                target.parentElement.querySelector("div") ??
                target.parentElement.parentElement?.querySelector("div")

            if (filterElement) {
                if (filterElement.style.maxHeight) {
                    filterElement.style.maxHeight = ""
                } else {
                    filterElement.style.maxHeight = `${filterElement.scrollHeight}px`
                }
            }
        }
    }

    const onPatternFilterChange: svelte.JSX.MouseEventHandler<HTMLButtonElement> = () => {
        const {pattern: isCurrentlyShowingPattern} = activeFilters
        let patternValue

        if (isCurrentlyShowingPattern === undefined) {
            patternValue = false
        } else if (isCurrentlyShowingPattern) {
            patternValue = undefined
        } else {
            patternValue = true
        }

        activeFilters = {
            ...activeFilters,
            pattern: patternValue,
        }

        if (shouldAutoApplyFilters) {
            onFilterApply()
        }
    }

    const createFurnitureFilterChangeHandler =
        (filterChoice: string): svelte.JSX.MouseEventHandler<HTMLButtonElement> =>
        () => {
            let shouldShowCabinets: boolean | undefined = true
            let shouldShowCountertops: boolean | undefined = true

            switch (filterChoice) {
                case "both": // If current setting is both countertops and cabinets
                    shouldShowCabinets = true
                    shouldShowCountertops = true
                    break

                case "either": // If current setting is either countertops or cabinets
                    shouldShowCabinets = undefined
                    shouldShowCountertops = undefined
                    break

                case "countertop": // If current setting is countertops only
                    shouldShowCabinets = false
                    shouldShowCountertops = true
                    break

                case "cabinets": // If current setting is cabinets only
                    shouldShowCabinets = true
                    shouldShowCountertops = false
                    break

                default:
                    break
            }

            activeFilters = {
                ...activeFilters,
                cabinets: shouldShowCabinets,
                countertop: shouldShowCountertops,
            }

            if (shouldAutoApplyFilters) {
                onFilterApply()
            }
        }

    const createFilterToggleHandler =
        (
            filterType: "colours" | "materials" | "locations",
            filterValue: string,
        ): svelte.JSX.MouseEventHandler<HTMLButtonElement> =>
        ({target}) => {
            if (activeFilters[filterType].includes(filterValue)) {
                activeFilters = {
                    ...activeFilters,
                    [filterType]: activeFilters[filterType].filter(
                        (_filterValue) => _filterValue !== filterValue,
                    ),
                }

                if (target instanceof window.HTMLElement) {
                    const icon =
                        target.querySelector("span") ?? target.parentElement?.querySelector("span")

                    if (icon) {
                        icon.innerText = "done"
                    }
                }
            } else {
                activeFilters = {
                    ...activeFilters,
                    [filterType]: [...activeFilters[filterType], filterValue],
                }

                if (target instanceof window.HTMLElement) {
                    const icon =
                        target.querySelector("span") ?? target.parentElement?.querySelector("span")

                    if (icon) {
                        icon.innerText = "clear"
                    }
                }
            }

            if (shouldAutoApplyFilters) {
                onFilterApply()
            }
        }
</script>

<!--
KK Cabinets
@copyright 2020 - 2021 Luke Zhang, Ethan Lim
@author Luke Zhang, Ethan Lim

https://luke-zhang-04.github.io
https://github.com/ethanlim04

@license GPL-3.0-or-later
-->

<div class="accordion" id="advancedSearch">
    <div class="card">
        <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button
                    class="btn btn-link text-dark"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    Advanced search
                </button>
            </h5>
        </div>

        <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#advancedSearch"
        >
            <div class="card-body">
                <p>Choose what categories you want to filter out</p>
                <h5>/</h5>
                <p>
                    <span class="material-icons">remove</span>
                    neutral - include all
                    <br />
                    <span class="material-icons">done</span>
                    included
                    <br />
                    <span class="material-icons">clear</span>
                    not included
                </p>
                <div class="row">
                    {#each types.filterTypes as filterType, index}
                        <div class="col-12 col-md-4 col-lg-2 filters">
                            <button
                                style="width: 100%"
                                class={`btn ${
                                    index % 2 === 0 ? "btn-secondary-reverse" : "btn-secondary"
                                }`}
                                on:click={onFilterExpand}
                            >
                                {handleFilterType(filterType)}
                                <span class="material-icons">arrow_drop_down</span>
                            </button>
                            <div>
                                {#each filterOptions[appendS(filterType)] as filterValue}
                                    <button
                                        class="dropdown_menu"
                                        on:click={createFilterToggleHandler(
                                            appendS(filterType),
                                            filterValue,
                                        )}
                                    >
                                        {filterValue}
                                        <span style="float: right;" class="material-icons">
                                            done
                                        </span>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/each}

                    <div class="col-12 col-md-4 col-lg-2 filters">
                        <button
                            style="width: 100%"
                            class="btn btn-secondary"
                            on:click={onFilterExpand}
                        >
                            Furniture
                            <span class="material-icons">arrow_drop_down</span>
                        </button>
                        <div>
                            {#each ["cabinets", "countertop", "both", "either"] as furnitureType}
                                <button
                                    class="dropdown_menu furniture_dropdown"
                                    on:click={createFurnitureFilterChangeHandler(furnitureType)}
                                >
                                    {furnitureType}
                                    <span style="float: right" class="material-icons">
                                        <!-- Note: this MUST be inlined for Svelte -->
                                        {(() => {
                                            if (furnitureType === "cabinets") {
                                                return activeFilters.cabinets ?? false
                                            } else if (furnitureType === "countertop") {
                                                return activeFilters.countertop ?? false
                                            } else if (furnitureType === "both") {
                                                return Boolean(
                                                    activeFilters.countertop &&
                                                        activeFilters.cabinets,
                                                )
                                            }

                                            return (
                                                activeFilters.countertop === undefined &&
                                                activeFilters.cabinets === undefined
                                            )
                                        })()
                                            ? "done"
                                            : ""}
                                    </span>
                                </button>
                            {/each}
                        </div>
                    </div>

                    <div class="col-12 col-md-4 col-lg-2 filters">
                        <button
                            style="width: 100%"
                            class="btn btn-secondary-reverse"
                            on:click={onPatternFilterChange}
                        >
                            Pattern
                            <span class="material-icons">
                                {(() => {
                                    if (activeFilters.pattern === false) {
                                        return "clear"
                                    } else if (activeFilters.pattern === true) {
                                        return "done"
                                    }

                                    return "remove"
                                })()}
                            </span>
                        </button>
                    </div>

                    <div class="col-12 col-md-4 col-lg-2" style="justify-content: right">
                        <button
                            style="width: 100%"
                            class="btn btn-success"
                            on:click={() => {
                                onFilterApply()
                            }}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 col-lg-10" />
                    <div class="col-12 col-md-4 col-lg-2">
                        <button
                            style="width: 100%"
                            class="btn btn-danger"
                            on:click={() => {
                                activeFilters = {
                                    colours: [],
                                    materials: [],
                                    cabinets: undefined,
                                    countertop: undefined,
                                    pattern: undefined,
                                    locations: [],
                                }
                                onFilterApply()
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
