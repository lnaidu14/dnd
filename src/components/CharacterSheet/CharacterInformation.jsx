import React from 'react'

export default function CharacterInformation({character}) {
  return (
    <>
        <div className="flex justify-center items-baseline gap-x-6">
          <div className="flex-auto">
            <div
              id="class"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.character_class}
            </div>
            <label
              htmlFor="class"
              className="flex items-center justify-center text-sm"
            >
              Class
            </label>
            <div
              id="subclass"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.subclass ? character.subclass : "N/A"}
            </div>
            <label
              htmlFor="subclass"
              className="flex items-center justify-center text-sm"
            >
              Subclass
            </label>
            <input
              id="exp"
              value={character.exp}
              className="w-full h-8 flex items-center justify-center text-sm bg-white-800 text-gray-800"
            ></input>
            <label
              htmlFor="exp"
              className="flex items-center justify-center text-sm"
            >
              Experience Level
            </label>
          </div>
          <div className="flex-auto">
            <div
              id="character_name"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.name}
            </div>
            <label
              htmlFor="character_name"
              className="flex items-center justify-center text-sm"
            >
              Character Name
            </label>
            <input
              id="level"
              value={character.level}
              className="w-full h-8 flex items-center justify-center text-sm bg-white-900 text-gray-800"
            />
            <label
              htmlFor="level"
              className="flex items-center justify-center text-sm"
            >
              Level
            </label>
          </div>
          <div className="flex-auto">
            <div
              id="race"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.race}
            </div>
            <label
              htmlFor="race"
              className="flex items-center justify-center text-sm"
            >
              Race
            </label>
            <div
              id="background"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.background}
            </div>
            <label
              htmlFor="background"
              className="flex items-center justify-center text-sm"
            >
              Background
            </label>
            <div
              id="alignment"
              className="w-full h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-800"
            >
              {character.alignment}
            </div>
            <label
              htmlFor="alignment"
              className="flex items-center justify-center text-sm"
            >
              Alignment
            </label>
          </div>
        </div></>
  )
}
