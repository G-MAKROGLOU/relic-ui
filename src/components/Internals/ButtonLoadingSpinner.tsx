import React from 'react'

export default function ButtonLoadingSpinner() {
    return (
        <span className="relic-button-loading-spinner">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1" stroke="white" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 4"/>
            </svg>
        </span>
    )
}