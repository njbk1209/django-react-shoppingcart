import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map((crumb, index, array) => {
        const breadcrumbPath = `/${array.slice(0, index + 1).join('/')}`;
        return (
            <li key={crumb} className="inline-flex items-center">
                <Link to={breadcrumbPath} className="inline-flex items-center text-sm font-medium capitalize text-gray-700 hover:text-yellow-700 dark:text-gray-400 dark:hover:text-white">
                    <svg
                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    {crumb}
                </Link>
            </li>
        );
    });

    return (
        <nav className="flex lg:ml-8 pt-8 pb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-700 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3 me-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                    </Link>
                </li>
                {crumbs}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;