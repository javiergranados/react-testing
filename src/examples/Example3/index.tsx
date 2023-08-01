import { SwipeableDrawer, Button } from '@mui/material'
import React, { useState } from 'react'

export const Example3: React.FC = () => {
  const [opened, setOpened] = useState(false)
  return (
    <div>
      <h2>Example3</h2>
      <Button variant="contained" aria-label="open" onClick={() => setOpened(true)}>
        Open Drawer
      </Button>
      <SwipeableDrawer anchor="right" open={opened} onClose={() => setOpened(false)} onOpen={() => setOpened(true)}>
        Swipeable Drawer
      </SwipeableDrawer>
    </div>
  )
}
