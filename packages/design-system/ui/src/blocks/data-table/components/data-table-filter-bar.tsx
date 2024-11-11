"use client"

import { ColumnFilter } from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/button"
import { Skeleton } from "@/components/skeleton"
import { useDataTableContext } from "../context/use-data-table-context"
import { DataTableFilter } from "./data-table-filter"

interface DataTableFilterBarProps {
  clearAllFiltersLabel?: string
}

const DataTableFilterBar = ({
  clearAllFiltersLabel = "Clear all",
}: DataTableFilterBarProps) => {
  const { instance } = useDataTableContext()

  const filterState = instance.getFiltering()

  const getFilterLabel = React.useCallback(
    (filter: ColumnFilter) => {
      const filterOptions = instance.getFilters()
      const filterOption = filterOptions.find(
        (option) => option.id === filter.id
      )
      return filterOption?.label ?? filter.id
    },
    [instance]
  )

  const clearFilters = React.useCallback(() => {
    instance.clearFilters()
  }, [instance])

  const filterCount = Object.keys(filterState).length

  if (filterCount === 0) {
    return null
  }

  if (instance.showSkeleton) {
    return <DataTableFilterBarSkeleton filterCount={filterCount} />
  }

  return (
    <div className="bg-ui-bg-subtle flex w-full flex-nowrap items-center gap-2 overflow-x-auto border-t px-6 py-2 md:flex-wrap">
      {Object.values(filterState).map((filter) => (
        <DataTableFilter
          key={filter.id}
          filter={filter}
          label={getFilterLabel(filter)}
        />
      ))}
      {filterCount > 0 ? (
        <Button
          variant="transparent"
          size="small"
          className="text-ui-fg-muted hover:text-ui-fg-subtle flex-shrink-0 whitespace-nowrap"
          type="button"
          onClick={clearFilters}
        >
          {clearAllFiltersLabel}
        </Button>
      ) : null}
    </div>
  )
}

const DataTableFilterBarSkeleton = ({
  filterCount,
}: {
  filterCount: number
}) => {
  return (
    <div className="bg-ui-bg-subtle flex w-full flex-nowrap items-center gap-2 overflow-x-auto border-t px-6 py-2 md:flex-wrap">
      {Array.from({ length: filterCount }).map((_, index) => (
        <Skeleton key={index} className="h-7 w-[180px]" />
      ))}
      {filterCount > 0 ? <Skeleton className="h-7 w-[66px]" /> : null}
    </div>
  )
}

export { DataTableFilterBar }
export type { DataTableFilterBarProps }