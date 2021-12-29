import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Buat Ujian Baru',
    to: '/newexam',
    icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Update Ujian',
    to: '/updateexam',
    icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>,
  }
]

export default _nav
