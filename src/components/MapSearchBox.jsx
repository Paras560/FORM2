import React from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { cn } from "@/lib/utils"

const MapSearchbox = ({ setMarkerPosition, setErrors, className }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])

    setMarkerPosition({ lat, lng })
    setErrors({})
  }

  return (
    <div
      className={cn(
        "z-20 md:absolute left-[200px] top-[10px] w-full md:w-[30%]",
        className
      )}
      style={{ zIndex: 10 }}
    >
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="h-10 w-full pl-2 rounded-input border-input border-[1px] mb-1"
          placeholder="Search an address"
        />
        <ComboboxPopover
          className="bg-white p-1 cursor-pointer"
          style={{ zIndex: 10 }}
        >
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default MapSearchbox
