import Headers from "../components/headers"
import {
  useActiveListings,
  useContract,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT, "marketplace");

  const { data: listings, isLoading:loadingListings}=useActiveListings(contract);

  return (
    <div className="">
      <Headers />
      <main className="max-w-6-xl mx-auto p-5">
        {loadingListings ? (
          <p className="text-center animate-pulse text-blue-500">Loading listings...</p>
        ) : 
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">

            {listings?.map(listings => (

            <div className="flex flex-col card hover:scale-105 transition-all duration-150 ease-out" key={listings.id}>

              <div className="flex-1 flex flex-col pb-2 items-center">

                <MediaRenderer className="w-44" src ={listings.asset.image} /> 
              </div>

                <div className="pt-2 space-y-4">
                  <div>
                  <h2 className="text-lg truncate">{listings.asset.name}</h2>
                  <hr></hr>
                   <p className="truncate text-sm text-gray-600 mt-2">{listings.asset.description}</p>
                   </div>

                   <p>
                    <span className="font-bold mr-1">
                      {listings.buyoutCurrencyValuePerToken.displayValue}
                    </span>{listings.buyoutCurrencyValuePerToken.symbol}
                   </p>

                   <div 
                   className={`flex items-center space-x-1 justify-end text-xs border w-fit ml-auto p-2 rounded-lg text-white ${
                    listings.type === ListingType.Direct
                     ? "bg-blue-400" 
                     : "bg-red-500"
                    } `}>
                    <p>
                      {listings.type === ListingType.Direct ?
                      "Buy Now" : "Auction"}
                    </p>
                    {listings.type === ListingType.Direct ?
                   (<BanknotesIcon className="h-4 "/> )
                   : 
                   (<ClockIcon />)
                  }
                   </div>
                </div>
            </div>
            ))}

          </div>
        )
        }

      </main>
    </div>
  )
}

export default Home
