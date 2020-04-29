import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import useTranslation from '../hooks/useTranslation'
import Header from './Header'
import Navigation from './Navigation'

interface Props {
  titleKey: string
}

const Layout: React.FC<Props> = ({ titleKey, children }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t(titleKey)}</title>
      </Head>
      <Header />
      <Navigation />

      <Container maxWidth="sm">
        {children}
      </Container>

    </>
  )
}

export default Layout
