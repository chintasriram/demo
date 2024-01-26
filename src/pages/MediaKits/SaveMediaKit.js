import React from 'react'

import BiaDashboardLayout from 'layouts/biaDashboardLayout'
import MDBox from 'components/MDBox'
import CreateMediaKit from 'components/MediaKits/SaveMediaKit'

export default function SaveMediaKit() {
  return (
    <BiaDashboardLayout>
      <MDBox sx={{px:0,my:8, ml: "auto", mr:"auto"}}>
        <CreateMediaKit/>
      </MDBox>
    </BiaDashboardLayout>
  )
}
