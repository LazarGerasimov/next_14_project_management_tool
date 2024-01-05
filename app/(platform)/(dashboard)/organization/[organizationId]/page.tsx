import { auth } from '@clerk/nextjs'
import React from 'react'

const OrganizationIdPage = () => {

    const { userId, orgId } = auth();

    return (
        <div>
            Org Page: {orgId}
            {/* <OrganizationSwitcher /> */}
        </div>
    )
}

export default OrganizationIdPage