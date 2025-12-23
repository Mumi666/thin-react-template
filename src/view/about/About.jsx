import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {useState} from 'react'

const people = [
    {id: 1, name: 'Durward Reynolds'},
    {id: 2, name: 'Kenton Towne'},
    {id: 3, name: 'Therese Wunsch'},
    {id: 4, name: 'Benedict Kessler'},
    {id: 5, name: 'Katelyn Rohan'},
]

export function About() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xs">
                <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                    <div className="relative">
                        {/* Trigger Button */}
                        <ListboxButton
                            className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedPerson.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </ListboxButton>

                        {/* Options Panel */}
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className="w-[--button-width] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                        >
                            {people.map((person) => (
                                <ListboxOption
                                    key={person.id}
                                    value={person}
                                    className="group flex cursor-default select-none items-center py-2 pl-3 pr-9 text-gray-900 data-focus:bg-blue-600 data-[focus]:text-white"
                                >
                  <span className="block truncate font-normal group-data-selected:font-semibold">
                    {person.name}
                  </span>

                                    {/* Checkmark for selected option */}
                                    {person.id === selectedPerson.id && (
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-focus:text-white">
                      <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                    </span>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>
        </div>
    )
}
