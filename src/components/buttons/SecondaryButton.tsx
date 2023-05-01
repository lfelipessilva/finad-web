import React from 'react'

interface Props {
  children: JSX.Element[] | JSX.Element,
  isLoading?: boolean,
  rest?: any
}

export default function SecondaryButton({ children, isLoading, ...rest }: Props) {
  return (
    <button
      className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-gray-700   font-semibold hover:opacity-80 transition-opacity duration-200"
      type="submit"
      {...rest}
    >
      {children}
      {!!isLoading && (
        <div className="flex items-center justify-center space-x-2 opacity-100">
          <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
          <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
          <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
        </div>
      )}
    </button>
  )
}