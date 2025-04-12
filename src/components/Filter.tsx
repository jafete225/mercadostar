"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);

        // Atualiza ou remove o parâmetro, se necessário
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mt-12 flex justify-between ">
            <div className="flex gap-6 flex-wrap">
                <select
                    name="type"
                    className="py-2 px-4 rounded-2xl font-medium text-xs bg-[#EBEDED]"
                    onChange={handleFilterChange}
                >
                    <option value="">Tipo</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                </select>

                <input
                    type="text"
                    name="min"
                    placeholder="Min Price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />

                <input
                    type="text"
                    name="max"
                    placeholder="Max Price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                />

                <select
                    name="cat"
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                    onChange={handleFilterChange}
                >
                    <option value="">Category</option>
                    <option value="new-arrival">New Arrival</option>
                    <option value="popular">Popular</option>
                </select>

                <select
                    name="all-filters"
                    className="py-2 px-4 rounded-2xl font-medium text-xs bg-[#EBEDED]"
                >
                    <option value="" disabled>
                        All Filters
                    </option>
                </select>
            </div>

            <div>
                <select
                    name="sort"
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
                    onChange={handleFilterChange}
                >
                    <option value="">Sort By</option>
                    <option value="asc price">Price (low to high)</option>
                    <option value="desc price">Price (high to low)</option>
                    <option value="asc lastUpdated">Newest</option>
                    <option value="desc lastUpdated">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
