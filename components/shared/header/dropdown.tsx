// components/dropdown.tsx
'use client'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { useState, ComponentType } from 'react'

interface SubItem {
  name: string
  href: string
}

interface DropdownCategory {
  category: string
  items: SubItem[]
}

interface DropdownMenuProps {
  label: string
  items: DropdownCategory[]
}

interface TriggerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  children: React.ReactNode
  sx: object
}

const DropdownMenu = ({ label, items }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const TriggerComponent = Box as ComponentType<TriggerProps>

  return (
    <>
      {/* Dropdown Trigger */}
      <TriggerComponent
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            color: 'black',
            '&:hover': {
              color: 'grey.700',
            },
          }}
        >
          {label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'black',
            ml: 0.5,
            fontSize: '1rem',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
      </TriggerComponent>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: '100vw',
              maxWidth: 'none',
              height: '60vh',
              padding: '30px 120px 0 120px',
              backgroundColor: 'white',
              boxShadow: 'none',
              borderRadius: 0,
              overflowY: 'auto',
              boxSizing: 'border-box',
              borderTop: '0.5px solid #ccc',
              mt: '10px',
              left: 0,
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocusItem
        disablePortal={false}
      >
        <div className='flex gap-20'>
          {items.length > 0 ? (
            items.map((group, index) => (
              <Box key={index}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
                >
                  {group.category}
                </Typography>
                {group.items.map((item, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={handleClose}
                    component={Link}
                    href={item.href} // Use the href from the SubItem
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      textDecoration: 'none',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Typography>
                    {item.name === 'Baby Crop' && (
                      <Typography
                        variant='caption'
                        sx={{
                          color: 'white',
                          fontSize: '0.75rem',
                          ml: 5,
                          backgroundColor: 'pink',
                          borderRadius: 1,
                          padding: '4px 10px',
                        }}
                      >
                        NEW
                      </Typography>
                    )}
                    {item.name === 'Tracksuit' && (
                      <Typography
                        variant='caption'
                        sx={{
                          color: 'white',
                          fontSize: '0.75rem',
                          ml: 5,
                          backgroundColor: 'pink',
                          borderRadius: 1,
                          padding: '4px 10px',
                        }}
                      >
                        RESTOCKED
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Box>
            ))
          ) : (
            <MenuItem onClick={handleClose}>
              <Typography variant='body2' sx={{ color: 'black' }}>
                Coming Soon
              </Typography>
            </MenuItem>
          )}
        </div>
      </Menu>
    </>
  )
}

export default DropdownMenu
