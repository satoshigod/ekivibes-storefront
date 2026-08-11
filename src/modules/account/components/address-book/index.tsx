import React from "react"

import AddDirección from "../address-card/add-address"
import EditarDirección from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type DirecciónBookProps = {
  customer: HttpTypes.TiendaCustomer
  region: HttpTypes.TiendaRegion
}

const DirecciónBook: React.FC<DirecciónBookProps> = ({ customer, region }) => {
  const { addresses } = customer
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <AddDirección region={region} addresses={addresses} />
        {addresses.map((address) => {
          return (
            <EditarDirección region={region} address={address} key={address.id} />
          )
        })}
      </div>
    </div>
  )
}

export default DirecciónBook
