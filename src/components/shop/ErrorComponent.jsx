import React from 'react'

const ErrorComponent = () => {
    return (
        <div className='col-span-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-28 text-red-600 mx-auto mt-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h1 className='text-2xl font-medium text-center'>No hay productos que coincidan con tu búsqueda.</h1>
            <ul className='list-disc text-base py-4 px-8 lg:ml-36'>
                <li>Los criterios de filtro que usaste no coinciden con ningún producto.</li>
                <li>La categoría que seleccionaste no posee <span className='font-semibold'>productos disponibles.</span></li>
            </ul>
        </div>
    )
}

export default ErrorComponent